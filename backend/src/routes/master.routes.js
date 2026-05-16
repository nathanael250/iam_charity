const express = require("express");
const commands = require("../config/commands");
const masterController = require("../controllers/masterController");
const { upload } = require("../middleware/upload");
const { asyncHandler } = require("../utils/controllerHelpers");
const HttpError = require("../utils/httpError");

const router = express.Router();

const commandMap = {
  [commands.HEALTH]: { handler: masterController.health },

  [commands.LIST_ADMINS]: { handler: masterController.listAdmins },
  [commands.GET_ADMIN]: { idSource: "id", handler: masterController.getAdmin },
  [commands.CREATE_ADMIN]: { handler: masterController.createAdmin },
  [commands.UPDATE_ADMIN]: { idSource: "id", handler: masterController.updateAdmin },
  [commands.DELETE_ADMIN]: { idSource: "id", handler: masterController.deleteAdmin },

  [commands.LIST_PROJECTS]: { handler: masterController.listProjects },
  [commands.GET_PROJECT]: { idSource: "id", handler: masterController.getProject },
  [commands.CREATE_PROJECT]: { handler: masterController.createProject },
  [commands.UPDATE_PROJECT]: { idSource: "id", handler: masterController.updateProject },
  [commands.DELETE_PROJECT]: { idSource: "id", handler: masterController.deleteProject },

  [commands.LIST_PROJECT_IMAGES]: { handler: masterController.listProjectImages },
  [commands.CREATE_PROJECT_IMAGE]: { handler: masterController.createProjectImage },
  [commands.UPLOAD_PROJECT_IMAGES]: {
    upload: upload.array("images", 10),
    handler: masterController.uploadProjectImages,
  },
  [commands.DELETE_PROJECT_IMAGE]: { idSource: "id", handler: masterController.deleteProjectImage },

  [commands.LIST_PROJECT_UPDATES]: { handler: masterController.listProjectUpdates },
  [commands.CREATE_PROJECT_UPDATE]: { handler: masterController.createProjectUpdate },
  [commands.DELETE_PROJECT_UPDATE]: { idSource: "id", handler: masterController.deleteProjectUpdate },

  [commands.LIST_DONATIONS]: { handler: masterController.listDonations },
  [commands.GET_DONATION]: { idSource: "id", handler: masterController.getDonation },
  [commands.CREATE_DONATION]: { handler: masterController.createDonation },
  [commands.UPDATE_DONATION_STATUS]: { idSource: "id", handler: masterController.updateDonationStatus },
  [commands.DELETE_DONATION]: { idSource: "id", handler: masterController.deleteDonation },

  [commands.LIST_VOLUNTEERS]: { handler: masterController.listVolunteers },
  [commands.GET_VOLUNTEER]: { idSource: "id", handler: masterController.getVolunteer },
  [commands.CREATE_VOLUNTEER]: { handler: masterController.createVolunteer },
  [commands.UPDATE_VOLUNTEER_STATUS]: { idSource: "id", handler: masterController.updateVolunteerStatus },
  [commands.DELETE_VOLUNTEER]: { idSource: "id", handler: masterController.deleteVolunteer },

  [commands.LIST_MESSAGES]: { handler: masterController.listMessages },
  [commands.GET_MESSAGE]: { idSource: "id", handler: masterController.getMessage },
  [commands.CREATE_MESSAGE]: { handler: masterController.createMessage },
  [commands.UPDATE_MESSAGE_STATUS]: { idSource: "id", handler: masterController.updateMessageStatus },
  [commands.DELETE_MESSAGE]: { idSource: "id", handler: masterController.deleteMessage },

  [commands.LIST_NEWSLETTER_SUBSCRIBERS]: { handler: masterController.listNewsletterSubscribers },
  [commands.CREATE_NEWSLETTER_SUBSCRIBER]: { handler: masterController.createNewsletterSubscriber },
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

router.all(
  "/",
  asyncHandler(async (req, res) => {
    const command = getCommandFromHeaders(req);
    if (!command) {
      throw new HttpError(400, "Missing request header. Use request");
    }

    const definition = commandMap[command];
    if (!definition) {
      throw new HttpError(404, `Unsupported command: ${command}`);
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
  })
);

module.exports = router;
