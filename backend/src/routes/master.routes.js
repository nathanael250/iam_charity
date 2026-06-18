const express = require("express");
const commands = require("../config/commands");
const masterController = require("../controllers/masterController");
const { cmsUpload, impactGalleryUpload, impactStoryUpload, upload, volunteerUpload } = require("../middleware/upload");
const { asyncHandler } = require("../utils/controllerHelpers");
const HttpError = require("../utils/httpError");
const auth = require("../middleware/auth");

const router = express.Router();

const commandMap = {
  [commands.HEALTH]: { public: true, handler: masterController.health },
  [commands.LOGIN]: { public: true, handler: masterController.login },

  [commands.LIST_ADMINS]: { handler: masterController.listAdmins },
  [commands.GET_ADMIN]: { idSource: "id", handler: masterController.getAdmin },
  [commands.CREATE_ADMIN]: { handler: masterController.createAdmin },
  [commands.UPDATE_ADMIN]: { idSource: "id", handler: masterController.updateAdmin },
  [commands.DELETE_ADMIN]: { idSource: "id", handler: masterController.deleteAdmin },
  [commands.GET_ADMIN_PROFILE]: { handler: masterController.getAdminProfile },
  [commands.UPDATE_ADMIN_PROFILE]: { handler: masterController.updateAdminProfile },
  [commands.UPDATE_ADMIN_PASSWORD]: { handler: masterController.updateAdminPassword },
  [commands.GET_NOTIFICATION_SETTINGS]: { handler: masterController.getNotificationSettings },
  [commands.UPDATE_NOTIFICATION_SETTINGS]: { handler: masterController.updateNotificationSettings },

  [commands.LIST_PROJECTS]: { public: true, handler: masterController.listProjects },
  [commands.GET_PROJECT]: { public: true, idSource: "id", handler: masterController.getProject },
  [commands.CREATE_PROJECT]: { handler: masterController.createProject },
  [commands.UPDATE_PROJECT]: { idSource: "id", handler: masterController.updateProject },
  [commands.DELETE_PROJECT]: { idSource: "id", handler: masterController.deleteProject },

  [commands.LIST_PROJECT_IMAGES]: { public: true, handler: masterController.listProjectImages },
  [commands.CREATE_PROJECT_IMAGE]: { handler: masterController.createProjectImage },
  [commands.UPLOAD_PROJECT_IMAGES]: {
    upload: upload.array("images", 10),
    handler: masterController.uploadProjectImages,
  },
  [commands.DELETE_PROJECT_IMAGE]: { idSource: "id", handler: masterController.deleteProjectImage },

  [commands.LIST_IMPACT_GALLERY_IMAGES]: { public: true, handler: masterController.listImpactGalleryImages },
  [commands.UPLOAD_IMPACT_GALLERY_IMAGES]: {
    upload: impactGalleryUpload.array("images", 10),
    handler: masterController.uploadImpactGalleryImages,
  },
  [commands.DELETE_IMPACT_GALLERY_IMAGE]: { idSource: "id", handler: masterController.deleteImpactGalleryImage },

  [commands.LIST_IMPACT_STATISTICS]: { public: true, handler: masterController.listImpactStatistics },
  [commands.UPDATE_IMPACT_STATISTIC]: { idSource: "id", handler: masterController.updateImpactStatistic },
  [commands.GET_HOME_IMPACT_SECTION]: { public: true, handler: masterController.getHomeImpactSection },
  [commands.UPDATE_HOME_IMPACT_SECTION]: {
    upload: cmsUpload.fields([
      { name: "before_image", maxCount: 1 },
      { name: "after_image", maxCount: 1 },
    ]),
    handler: masterController.updateHomeImpactSection,
  },
  [commands.GET_ABOUT_IMPACT_SECTION]: { public: true, handler: masterController.getAboutImpactSection },
  [commands.UPDATE_ABOUT_IMPACT_SECTION]: {
    upload: cmsUpload.single("impact_image"),
    handler: masterController.updateAboutImpactSection,
  },
  [commands.GET_IMPACT_PAGE_HERO]: { public: true, handler: masterController.getImpactPageHero },
  [commands.UPDATE_IMPACT_PAGE_HERO]: {
    upload: cmsUpload.fields([
      { name: "before_image", maxCount: 1 },
      { name: "after_image", maxCount: 1 },
    ]),
    handler: masterController.updateImpactPageHero,
  },
  [commands.LIST_IMPACT_PAGE_STATISTICS]: { public: true, handler: masterController.listImpactPageStatistics },
  [commands.UPDATE_IMPACT_PAGE_STATISTIC]: { idSource: "id", handler: masterController.updateImpactPageStatistic },
  [commands.LIST_HOME_TESTIMONIALS]: { public: true, handler: masterController.listHomeTestimonials },
  [commands.CREATE_HOME_TESTIMONIAL]: { handler: masterController.createHomeTestimonial },
  [commands.UPDATE_HOME_TESTIMONIAL]: { idSource: "id", handler: masterController.updateHomeTestimonial },
  [commands.DELETE_HOME_TESTIMONIAL]: { idSource: "id", handler: masterController.deleteHomeTestimonial },

  [commands.LIST_PROJECT_UPDATES]: { public: true, handler: masterController.listProjectUpdates },
  [commands.CREATE_PROJECT_UPDATE]: {
    upload: impactStoryUpload.fields([
      { name: "before_image", maxCount: 1 },
      { name: "after_image", maxCount: 1 },
    ]),
    handler: masterController.createProjectUpdate,
  },
  [commands.UPDATE_PROJECT_UPDATE]: {
    idSource: "id",
    upload: impactStoryUpload.fields([
      { name: "before_image", maxCount: 1 },
      { name: "after_image", maxCount: 1 },
    ]),
    handler: masterController.updateProjectUpdate,
  },
  [commands.UPDATE_PROJECT_UPDATE_IMAGES]: {
    idSource: "id",
    upload: impactStoryUpload.fields([
      { name: "before_image", maxCount: 1 },
      { name: "after_image", maxCount: 1 },
    ]),
    handler: masterController.updateProjectUpdateImages,
  },
  [commands.UPDATE_PROJECT_UPDATE_STATUS]: { idSource: "id", handler: masterController.updateProjectUpdateStatus },
  [commands.DELETE_PROJECT_UPDATE]: { idSource: "id", handler: masterController.deleteProjectUpdate },

  [commands.LIST_BENEFICIARIES]: { handler: masterController.listBeneficiaries },
  [commands.GET_BENEFICIARY]: { idSource: "id", handler: masterController.getBeneficiary },
  [commands.CREATE_BENEFICIARY]: { handler: masterController.createBeneficiary },
  [commands.UPDATE_BENEFICIARY]: { idSource: "id", handler: masterController.updateBeneficiary },
  [commands.DELETE_BENEFICIARY]: { idSource: "id", handler: masterController.deleteBeneficiary },

  [commands.LIST_MATERIAL_UNITS]: { handler: masterController.listMaterialUnits },
  [commands.CREATE_MATERIAL_UNIT]: { handler: masterController.createMaterialUnit },
  [commands.UPDATE_MATERIAL_UNIT]: { idSource: "id", handler: masterController.updateMaterialUnit },
  [commands.DELETE_MATERIAL_UNIT]: { idSource: "id", handler: masterController.deleteMaterialUnit },

  [commands.LIST_MATERIALS_USED]: { handler: masterController.listMaterialsUsed },
  [commands.GET_MATERIAL_USED]: { idSource: "id", handler: masterController.getMaterialUsed },
  [commands.CREATE_MATERIAL_USED]: { handler: masterController.createMaterialUsed },
  [commands.UPDATE_MATERIAL_USED]: { idSource: "id", handler: masterController.updateMaterialUsed },
  [commands.DELETE_MATERIAL_USED]: { idSource: "id", handler: masterController.deleteMaterialUsed },

  [commands.LIST_EXPENSE_CATEGORIES]: { handler: masterController.listExpenseCategories },
  [commands.CREATE_EXPENSE_CATEGORY]: { handler: masterController.createExpenseCategory },
  [commands.UPDATE_EXPENSE_CATEGORY]: { idSource: "id", handler: masterController.updateExpenseCategory },
  [commands.DELETE_EXPENSE_CATEGORY]: { idSource: "id", handler: masterController.deleteExpenseCategory },

  [commands.LIST_EXPENSES]: { handler: masterController.listExpenses },
  [commands.GET_EXPENSE]: { idSource: "id", handler: masterController.getExpense },
  [commands.CREATE_EXPENSE]: { handler: masterController.createExpense },
  [commands.UPDATE_EXPENSE]: { idSource: "id", handler: masterController.updateExpense },
  [commands.DELETE_EXPENSE]: { idSource: "id", handler: masterController.deleteExpense },

  [commands.GET_RESOURCE_SUMMARY]: { handler: masterController.getResourceSummary },

  [commands.LIST_DONATIONS]: { handler: masterController.listDonations },
  [commands.GET_DONATION]: { idSource: "id", handler: masterController.getDonation },
  [commands.CREATE_DONATION]: { public: true, handler: masterController.createDonation },
  [commands.UPDATE_DONATION_STATUS]: { idSource: "id", handler: masterController.updateDonationStatus },
  [commands.DELETE_DONATION]: { idSource: "id", handler: masterController.deleteDonation },

  [commands.LIST_VOLUNTEERS]: { handler: masterController.listVolunteers },
  [commands.GET_VOLUNTEER]: { idSource: "id", handler: masterController.getVolunteer },
  [commands.CREATE_VOLUNTEER]: {
    public: true,
    upload: volunteerUpload.single("image"),
    handler: masterController.createVolunteer,
  },
  [commands.UPDATE_VOLUNTEER_STATUS]: { idSource: "id", handler: masterController.updateVolunteerStatus },
  [commands.DELETE_VOLUNTEER]: { idSource: "id", handler: masterController.deleteVolunteer },

  [commands.LIST_MESSAGES]: { handler: masterController.listMessages },
  [commands.GET_MESSAGE]: { idSource: "id", handler: masterController.getMessage },
  [commands.CREATE_MESSAGE]: { public: true, handler: masterController.createMessage },
  [commands.UPDATE_MESSAGE_STATUS]: { idSource: "id", handler: masterController.updateMessageStatus },
  [commands.DELETE_MESSAGE]: { idSource: "id", handler: masterController.deleteMessage },

  [commands.LIST_NEWSLETTER_SUBSCRIBERS]: { handler: masterController.listNewsletterSubscribers },
  [commands.CREATE_NEWSLETTER_SUBSCRIBER]: { public: true, handler: masterController.createNewsletterSubscriber },
  [commands.UPDATE_NEWSLETTER_SUBSCRIBER_STATUS]: {
    idSource: "id",
    handler: masterController.updateNewsletterSubscriberStatus,
  },
  [commands.DELETE_NEWSLETTER_SUBSCRIBER]: {
    idSource: "id",
    handler: masterController.deleteNewsletterSubscriber,
  },
};

const getCommandFromHeaders = (req) => {
  return req.headers.request || req.headers["x-command"] || req.headers.command;
};

const prepareRequest = (req, definition) => {
  const payload = req.body && typeof req.body === "object" ? req.body : {};
  req.query = { ...req.query, ...payload };
  req.params = req.params || {};

  if (definition.idSource) {
    const resourceId = payload[definition.idSource] || req.query[definition.idSource] || req.headers["x-resource-id"];

    if (!resourceId) {
      throw new HttpError(400, `Missing required field: ${definition.idSource}`);
    }

    req.params.id = resourceId;
  }
};

const handleCommandRequest = asyncHandler(async (req, res) => {
  const command = getCommandFromHeaders(req);
  if (!command) {
    throw new HttpError(400, "Missing request header. Use request");
  }

  const definition = commandMap[command];
  if (!definition) {
    throw new HttpError(404, `Unsupported command: ${command}`);
  }

  if (!definition.public) {
    await new Promise((resolve, reject) => {
      auth(req, res, (error) => (error ? reject(error) : resolve()));
    });
  }

  if (definition.upload) {
    await new Promise((resolve, reject) => {
      definition.upload(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  prepareRequest(req, definition);
  await definition.handler(req, res);
});

router.all("/", handleCommandRequest);
router.all("/request", handleCommandRequest);
router.all("/api/request", handleCommandRequest);

module.exports = router;
