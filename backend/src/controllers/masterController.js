const commands = require("../config/commands");
const Admin = require("../models/Admin");
const Donation = require("../models/Donation");
const Message = require("../models/Message");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const Project = require("../models/Project");
const ProjectImage = require("../models/ProjectImage");
const ImpactGalleryImage = require("../models/ImpactGalleryImage");
const ImpactStatistic = require("../models/ImpactStatistic");
const HomeImpactSection = require("../models/HomeImpactSection");
const HomeTestimonial = require("../models/HomeTestimonial");
const AboutImpactSection = require("../models/AboutImpactSection");
const ImpactPageHero = require("../models/ImpactPageHero");
const ImpactPageStatistic = require("../models/ImpactPageStatistic");
const ProjectUpdate = require("../models/ProjectUpdate");
const Volunteer = require("../models/Volunteer");
const Beneficiary = require("../models/Beneficiary");
const MaterialUnit = require("../models/MaterialUnit");
const MaterialUsed = require("../models/MaterialUsed");
const ExpenseCategory = require("../models/ExpenseCategory");
const Expense = require("../models/Expense");
const { parsePagination, requireFields } = require("../utils/controllerHelpers");
const BaseModel = require("../models/BaseModel");
const HttpError = require("../utils/httpError");
const { createAuthToken } = require("../utils/authToken");
const { hashPassword, verifyPassword } = require("../utils/password");
const { query } = require("../config/database");

const listPayload = (req) => ({
  ...parsePagination(req.query),
  ...req.query,
});

const masterController = {
  commands,

  health: async (_req, res) => {
    res.json({ success: true, message: "Charity backend is running" });
  },

  login: async (req, res) => {
    requireFields(req.body, ["email", "password"]);
    const admin = await Admin.findByEmail(String(req.body.email).trim());

    if (!admin || admin.status !== "active") {
      throw new HttpError(401, "Invalid email or password");
    }

    const passwordResult = await verifyPassword(String(req.body.password), admin.password_hash);
    if (!passwordResult.matches) {
      throw new HttpError(401, "Invalid email or password");
    }

    if (passwordResult.needsUpgrade) {
      await Admin.updatePasswordHash(admin.id, await hashPassword(String(req.body.password)));
    }
    await Admin.recordLogin(admin.id);

    const { token, expiresAt } = createAuthToken(admin);
    res.json({
      success: true,
      data: {
        token,
        expiresAt,
        user: {
          id: admin.id,
          name: admin.full_name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  },

  listAdmins: async (req, res) => {
    res.json({ success: true, data: await Admin.list(listPayload(req)) });
  },
  getAdmin: async (req, res) => {
    res.json({ success: true, data: await Admin.findById(req.params.id) });
  },
  createAdmin: async (req, res) => {
    requireFields(req.body, ["full_name", "email", "password_hash"]);
    res.status(201).json({ success: true, data: await Admin.create(req.body) });
  },
  updateAdmin: async (req, res) => {
    res.json({ success: true, data: await Admin.update(req.params.id, req.body) });
  },
  deleteAdmin: async (req, res) => {
    res.json({ success: true, data: await Admin.delete(req.params.id) });
  },

  listProjects: async (req, res) => {
    res.json({ success: true, data: await Project.list(listPayload(req)) });
  },
  getProject: async (req, res) => {
    res.json({ success: true, data: await Project.findById(req.params.id) });
  },
  createProject: async (req, res) => {
    requireFields(req.body, ["title", "slug"]);
    res.status(201).json({ success: true, data: await Project.create(req.body) });
  },
  updateProject: async (req, res) => {
    res.json({ success: true, data: await Project.update(req.params.id, req.body) });
  },
  deleteProject: async (req, res) => {
    res.json({ success: true, data: await Project.delete(req.params.id) });
  },

  listProjectImages: async (req, res) => {
    const projectId = req.body?.project_id || req.query?.project_id || req.headers["x-resource-id"];
    requireFields({ project_id: projectId }, ["project_id"]);
    res.json({
      success: true,
      data: await ProjectImage.list({ ...listPayload(req), project_id: projectId }),
    });
  },
  createProjectImage: async (req, res) => {
    requireFields(req.body, ["project_id", "image_url"]);
    res.status(201).json({ success: true, data: await ProjectImage.create(req.body) });
  },
  uploadProjectImages: async (req, res) => {
    requireFields(req.body, ["project_id"]);

    const files = req.files || [];
    if (!files.length) {
      res.status(400).json({ success: false, message: "Please upload at least one image" });
      return;
    }

    const captions = Array.isArray(req.body.captions)
      ? req.body.captions
      : typeof req.body.captions === "string"
        ? req.body.captions.split("|")
        : [];
    const requestedMainIndex = Number(req.body.main_index ?? -1);
    const mainIndex = requestedMainIndex >= 0 && requestedMainIndex < files.length
      ? requestedMainIndex
      : 0;

    const images = files.map((file, index) => ({
      image_url: `/uploads/projects/${file.filename}`,
      caption: captions[index] || null,
      is_main: index === mainIndex,
    }));

    const createdImages = await ProjectImage.createMany(req.body.project_id, images);
    const mainImage = createdImages.find((image) => image.is_main) || createdImages[0];

    if (mainImage) {
      await Project.update(req.body.project_id, { main_image: mainImage.image_url });
    }

    res.status(201).json({
      success: true,
      data: createdImages,
    });
  },
  deleteProjectImage: async (req, res) => {
    res.json({ success: true, data: await ProjectImage.delete(req.params.id) });
  },

  listImpactGalleryImages: async (req, res) => {
    res.json({ success: true, data: await ImpactGalleryImage.list(listPayload(req)) });
  },
  uploadImpactGalleryImages: async (req, res) => {
    requireFields(req.body, ["project_id"]);
    const files = req.files || [];
    if (!files.length) throw new HttpError(400, "Please upload at least one image");

    const captions = Array.isArray(req.body.captions)
      ? req.body.captions
      : typeof req.body.captions === "string"
        ? req.body.captions.split("|")
        : [];
    const positions = Array.isArray(req.body.positions)
      ? req.body.positions
      : typeof req.body.positions === "string"
        ? req.body.positions.split("|")
        : [];
    const normalizedPositions = positions.map((position) => Number(position)).filter((position) => position >= 1 && position <= 4);
    if (normalizedPositions.length !== files.length) throw new HttpError(400, "Choose a gallery position for each image");
    if (new Set(normalizedPositions).size !== normalizedPositions.length) throw new HttpError(400, "Each gallery position can only be used once");
    const occupiedPositions = await ImpactGalleryImage.list({ limit: 100 });
    const occupiedSet = new Set(occupiedPositions.map((image) => Number(image.gallery_position)).filter((position) => position >= 1 && position <= 4));
    const unavailablePosition = normalizedPositions.find((position) => occupiedSet.has(position));
    if (unavailablePosition) throw new HttpError(400, `Gallery position ${unavailablePosition} is already uploaded`);

    const images = files.map((file, index) => ({
      project_id: req.body.project_id,
      image_url: `/uploads/impact-gallery/${file.filename}`,
      caption: captions[index] || null,
      gallery_position: normalizedPositions[index],
      created_by: req.user?.sub || null,
    }));
    res.status(201).json({ success: true, data: await ImpactGalleryImage.createMany(images) });
  },
  deleteImpactGalleryImage: async (req, res) => {
    res.json({ success: true, data: await ImpactGalleryImage.delete(req.params.id) });
  },

  listImpactStatistics: async (req, res) => {
    res.json({ success: true, data: await ImpactStatistic.list(listPayload(req)) });
  },
  updateImpactStatistic: async (req, res) => {
    res.json({
      success: true,
      data: await ImpactStatistic.update(req.params.id, { ...req.body, updated_by: req.user?.sub || null }),
    });
  },
  getHomeImpactSection: async (_req, res) => {
    res.json({ success: true, data: await HomeImpactSection.get() });
  },
  updateHomeImpactSection: async (req, res) => {
    const files = req.files || {};
    const beforeFile = Array.isArray(files.before_image) ? files.before_image[0] : null;
    const afterFile = Array.isArray(files.after_image) ? files.after_image[0] : null;
    const payload = {
      badge_value: req.body.badge_value,
      updated_by: req.user?.sub || null,
    };
    if (beforeFile) payload.before_image_url = `/uploads/cms/${beforeFile.filename}`;
    if (afterFile) payload.after_image_url = `/uploads/cms/${afterFile.filename}`;
    res.json({
      success: true,
      data: await HomeImpactSection.update(payload),
    });
  },
  getAboutImpactSection: async (_req, res) => {
    res.json({ success: true, data: await AboutImpactSection.get() });
  },
  updateAboutImpactSection: async (req, res) => {
    const file = req.file || null;
    const payload = {
      updated_by: req.user?.sub || null,
    };
    if (file) payload.impact_image_url = `/uploads/cms/${file.filename}`;
    res.json({ success: true, data: await AboutImpactSection.update(payload) });
  },
  getImpactPageHero: async (_req, res) => {
    res.json({ success: true, data: await ImpactPageHero.get() });
  },
  updateImpactPageHero: async (req, res) => {
    const files = req.files || {};
    const beforeFile = Array.isArray(files.before_image) ? files.before_image[0] : null;
    const afterFile = Array.isArray(files.after_image) ? files.after_image[0] : null;
    const payload = { updated_by: req.user?.sub || null };
    if (beforeFile) payload.before_image_url = `/uploads/cms/${beforeFile.filename}`;
    if (afterFile) payload.after_image_url = `/uploads/cms/${afterFile.filename}`;
    res.json({ success: true, data: await ImpactPageHero.update(payload) });
  },
  listImpactPageStatistics: async (req, res) => {
    res.json({ success: true, data: await ImpactPageStatistic.list(listPayload(req)) });
  },
  updateImpactPageStatistic: async (req, res) => {
    res.json({
      success: true,
      data: await ImpactPageStatistic.update(req.params.id, { ...req.body, updated_by: req.user?.sub || null }),
    });
  },
  listHomeTestimonials: async (req, res) => {
    res.json({ success: true, data: await HomeTestimonial.list(listPayload(req)) });
  },
  createHomeTestimonial: async (req, res) => {
    requireFields(req.body, ["quote", "name"]);
    res.status(201).json({
      success: true,
      data: await HomeTestimonial.create({ ...req.body, updated_by: req.user?.sub || null }),
    });
  },
  updateHomeTestimonial: async (req, res) => {
    res.json({
      success: true,
      data: await HomeTestimonial.update(req.params.id, { ...req.body, updated_by: req.user?.sub || null }),
    });
  },
  deleteHomeTestimonial: async (req, res) => {
    res.json({ success: true, data: await HomeTestimonial.delete(req.params.id) });
  },

  listProjectUpdates: async (req, res) => {
    res.json({ success: true, data: await ProjectUpdate.list(listPayload(req)) });
  },
  createProjectUpdate: async (req, res) => {
    requireFields(req.body, ["project_id", "title"]);
    const files = req.files || {};
    const beforeFile = Array.isArray(files.before_image) ? files.before_image[0] : null;
    const afterFile = Array.isArray(files.after_image) ? files.after_image[0] : null;
    const payload = { ...req.body, created_by: req.user?.sub || null };
    if (beforeFile) payload.before_image_url = `/uploads/impact-stories/${beforeFile.filename}`;
    if (afterFile) payload.after_image_url = `/uploads/impact-stories/${afterFile.filename}`;

    res.status(201).json({
      success: true,
      data: await ProjectUpdate.create(payload),
    });
  },
  updateProjectUpdate: async (req, res) => {
    const files = req.files || {};
    const beforeFile = Array.isArray(files.before_image) ? files.before_image[0] : null;
    const afterFile = Array.isArray(files.after_image) ? files.after_image[0] : null;
    const payload = { ...req.body };
    if (beforeFile) payload.before_image_url = `/uploads/impact-stories/${beforeFile.filename}`;
    if (afterFile) payload.after_image_url = `/uploads/impact-stories/${afterFile.filename}`;

    res.json({ success: true, data: await ProjectUpdate.update(req.params.id, payload) });
  },
  updateProjectUpdateImages: async (req, res) => {
    const files = req.files || {};
    const beforeFile = Array.isArray(files.before_image) ? files.before_image[0] : null;
    const afterFile = Array.isArray(files.after_image) ? files.after_image[0] : null;

    if (!beforeFile && !afterFile) throw new HttpError(400, "Please upload a before image or an after image");

    const payload = {};
    if (beforeFile) payload.before_image_url = `/uploads/impact-stories/${beforeFile.filename}`;
    if (afterFile) payload.after_image_url = `/uploads/impact-stories/${afterFile.filename}`;

    res.json({ success: true, data: await ProjectUpdate.updateImages(req.params.id, payload) });
  },
  updateProjectUpdateStatus: async (req, res) => {
    requireFields(req.body, ["status"]);
    res.json({ success: true, data: await ProjectUpdate.updateStatus(req.params.id, req.body.status) });
  },
  deleteProjectUpdate: async (req, res) => {
    res.json({ success: true, data: await ProjectUpdate.delete(req.params.id) });
  },

  listBeneficiaries: async (req, res) => {
    res.json({ success: true, data: await Beneficiary.list(listPayload(req)) });
  },
  getBeneficiary: async (req, res) => {
    res.json({ success: true, data: await Beneficiary.findById(req.params.id) });
  },
  createBeneficiary: async (req, res) => {
    requireFields(req.body, ["display_name", "contact_phone"]);
    res.status(201).json({
      success: true,
      data: await Beneficiary.create({ ...req.body, created_by: req.user?.sub || null }),
    });
  },
  updateBeneficiary: async (req, res) => {
    res.json({ success: true, data: await Beneficiary.update(req.params.id, req.body) });
  },
  deleteBeneficiary: async (req, res) => {
    res.json({ success: true, data: await Beneficiary.delete(req.params.id) });
  },

  listMaterialUnits: async (req, res) => {
    res.json({ success: true, data: await MaterialUnit.list(listPayload(req)) });
  },
  createMaterialUnit: async (req, res) => {
    requireFields(req.body, ["unit_name", "unit_code"]);
    res.status(201).json({ success: true, data: await MaterialUnit.create(req.body) });
  },
  updateMaterialUnit: async (req, res) => {
    res.json({ success: true, data: await MaterialUnit.update(req.params.id, req.body) });
  },
  deleteMaterialUnit: async (req, res) => {
    res.json({ success: true, data: await MaterialUnit.delete(req.params.id) });
  },

  listMaterialsUsed: async (req, res) => {
    res.json({ success: true, data: await MaterialUsed.list(listPayload(req)) });
  },
  getMaterialUsed: async (req, res) => {
    res.json({ success: true, data: await MaterialUsed.findById(req.params.id) });
  },
  createMaterialUsed: async (req, res) => {
    requireFields(req.body, ["beneficiary_id", "material_name", "unit_id", "date_used"]);
    res.status(201).json({
      success: true,
      data: await MaterialUsed.create({ ...req.body, created_by: req.user?.sub || null }),
    });
  },
  updateMaterialUsed: async (req, res) => {
    res.json({ success: true, data: await MaterialUsed.update(req.params.id, req.body) });
  },
  deleteMaterialUsed: async (req, res) => {
    res.json({ success: true, data: await MaterialUsed.delete(req.params.id) });
  },

  listExpenseCategories: async (req, res) => {
    res.json({ success: true, data: await ExpenseCategory.list(listPayload(req)) });
  },
  createExpenseCategory: async (req, res) => {
    requireFields(req.body, ["category_name", "category_code"]);
    res.status(201).json({ success: true, data: await ExpenseCategory.create(req.body) });
  },
  updateExpenseCategory: async (req, res) => {
    res.json({ success: true, data: await ExpenseCategory.update(req.params.id, req.body) });
  },
  deleteExpenseCategory: async (req, res) => {
    res.json({ success: true, data: await ExpenseCategory.delete(req.params.id) });
  },

  listExpenses: async (req, res) => {
    res.json({ success: true, data: await Expense.list(listPayload(req)) });
  },
  getExpense: async (req, res) => {
    res.json({ success: true, data: await Expense.findById(req.params.id) });
  },
  createExpense: async (req, res) => {
    requireFields(req.body, ["beneficiary_id", "expense_category_id", "description", "expense_date"]);
    res.status(201).json({
      success: true,
      data: await Expense.create({ ...req.body, created_by: req.user?.sub || null }),
    });
  },
  updateExpense: async (req, res) => {
    res.json({ success: true, data: await Expense.update(req.params.id, req.body) });
  },
  deleteExpense: async (req, res) => {
    res.json({ success: true, data: await Expense.delete(req.params.id) });
  },

  getResourceSummary: async (_req, res) => {
    const rows = await query(
      `SELECT
        (SELECT COUNT(*) FROM beneficiaries) AS total_beneficiaries,
        (SELECT COALESCE(SUM(people_count), 0) FROM beneficiaries WHERE status IN ('active', 'completed')) AS people_helped,
        (SELECT COALESCE(SUM(total_cost), 0) FROM materials_used) AS materials_cost,
        (SELECT COALESCE(SUM(amount), 0) FROM expenses) AS expenses_cost`
    );
    const summary = rows[0] || {};
    const materialsCost = Number(summary.materials_cost || 0);
    const expensesCost = Number(summary.expenses_cost || 0);

    res.json({
      success: true,
      data: {
        total_beneficiaries: Number(summary.total_beneficiaries || 0),
        people_helped: Number(summary.people_helped || 0),
        materials_cost: materialsCost,
        expenses_cost: expensesCost,
        total_money_used: materialsCost + expensesCost,
      },
    });
  },

  listDonations: async (req, res) => {
    res.json({ success: true, data: await Donation.list(listPayload(req)) });
  },
  getDonation: async (req, res) => {
    res.json({ success: true, data: await Donation.findById(req.params.id) });
  },
  createDonation: async (req, res) => {
    requireFields(req.body, ["amount", "payment_method"]);
    res.status(201).json({ success: true, data: await Donation.createMockPayment(req.body) });
  },
  updateDonationStatus: async (req, res) => {
    requireFields(req.body, ["payment_status"]);
    res.json({ success: true, data: await Donation.updateStatus(req.params.id, req.body.payment_status) });
  },
  deleteDonation: async (req, res) => {
    res.json({ success: true, data: await Donation.delete(req.params.id) });
  },

  listVolunteers: async (req, res) => {
    res.json({ success: true, data: await Volunteer.list(listPayload(req)) });
  },
  getVolunteer: async (req, res) => {
    res.json({ success: true, data: await BaseModel.findById("volunteers", req.params.id) });
  },
  createVolunteer: async (req, res) => {
    requireFields(req.body, ["full_name", "phone"]);
    res.status(201).json({
      success: true,
      data: await Volunteer.create({
        ...req.body,
        image_url: req.file ? `/uploads/volunteers/${req.file.filename}` : null,
        status: "pending",
      }),
    });
  },
  updateVolunteerStatus: async (req, res) => {
    requireFields(req.body, ["status"]);
    res.json({ success: true, data: await Volunteer.updateStatus(req.params.id, req.body.status) });
  },
  deleteVolunteer: async (req, res) => {
    res.json({ success: true, data: await Volunteer.delete(req.params.id) });
  },

  listMessages: async (req, res) => {
    res.json({ success: true, data: await Message.list(listPayload(req)) });
  },
  getMessage: async (req, res) => {
    res.json({ success: true, data: await BaseModel.findById("messages", req.params.id) });
  },
  createMessage: async (req, res) => {
    requireFields(req.body, ["full_name", "message"]);
    res.status(201).json({ success: true, data: await Message.create(req.body) });
  },
  updateMessageStatus: async (req, res) => {
    requireFields(req.body, ["status"]);
    res.json({ success: true, data: await Message.updateStatus(req.params.id, req.body.status) });
  },
  deleteMessage: async (req, res) => {
    res.json({ success: true, data: await Message.delete(req.params.id) });
  },

  listNewsletterSubscribers: async (req, res) => {
    res.json({ success: true, data: await NewsletterSubscriber.list(listPayload(req)) });
  },
  createNewsletterSubscriber: async (req, res) => {
    requireFields(req.body, ["email"]);
    res.status(201).json({ success: true, data: await NewsletterSubscriber.create(req.body) });
  },
  updateNewsletterSubscriberStatus: async (req, res) => {
    requireFields(req.body, ["status"]);
    res.json({
      success: true,
      data: await NewsletterSubscriber.updateStatus(req.params.id, req.body.status),
    });
  },
  deleteNewsletterSubscriber: async (req, res) => {
    res.json({ success: true, data: await NewsletterSubscriber.delete(req.params.id) });
  },
};

module.exports = masterController;
