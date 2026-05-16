const commands = require("../config/commands");
const Admin = require("../models/Admin");
const Donation = require("../models/Donation");
const Message = require("../models/Message");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const Project = require("../models/Project");
const ProjectImage = require("../models/ProjectImage");
const ProjectUpdate = require("../models/ProjectUpdate");
const Volunteer = require("../models/Volunteer");
const { parsePagination, requireFields } = require("../utils/controllerHelpers");
const BaseModel = require("../models/BaseModel");

const listPayload = (req) => ({
  ...parsePagination(req.query),
  ...req.query,
});

const masterController = {
  commands,

  health: async (_req, res) => {
    res.json({ success: true, message: "Charity backend is running" });
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
    res.json({ success: true, data: await ProjectImage.list(listPayload(req)) });
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
    const mainIndex = Number(req.body.main_index || -1);

    const images = files.map((file, index) => ({
      image_url: `/uploads/projects/${file.filename}`,
      caption: captions[index] || null,
      is_main: index === mainIndex,
    }));

    res.status(201).json({
      success: true,
      data: await ProjectImage.createMany(req.body.project_id, images),
    });
  },
  deleteProjectImage: async (req, res) => {
    res.json({ success: true, data: await ProjectImage.delete(req.params.id) });
  },

  listProjectUpdates: async (req, res) => {
    res.json({ success: true, data: await ProjectUpdate.list(listPayload(req)) });
  },
  createProjectUpdate: async (req, res) => {
    requireFields(req.body, ["project_id", "title"]);
    res.status(201).json({ success: true, data: await ProjectUpdate.create(req.body) });
  },
  deleteProjectUpdate: async (req, res) => {
    res.json({ success: true, data: await ProjectUpdate.delete(req.params.id) });
  },

  listDonations: async (req, res) => {
    res.json({ success: true, data: await Donation.list(listPayload(req)) });
  },
  getDonation: async (req, res) => {
    res.json({ success: true, data: await Donation.findById(req.params.id) });
  },
  createDonation: async (req, res) => {
    requireFields(req.body, ["amount"]);
    res.status(201).json({ success: true, data: await Donation.create(req.body) });
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
    res.status(201).json({ success: true, data: await Volunteer.create(req.body) });
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
