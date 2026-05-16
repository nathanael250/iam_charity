import { clientRequest } from "./clientService";

export const projectService = {
  list: (params = {}) => clientRequest("list_projects", params),
  get: (id) => clientRequest("get_project", { id }),
  create: (payload) => clientRequest("create_project", payload),
  update: (id, payload) => clientRequest("update_project", { id, ...payload }),
  remove: (id) => clientRequest("delete_project", { id }),
};

export const projectImageService = {
  list: (projectId, params = {}) => clientRequest("list_project_images", { project_id: projectId, limit: 100, ...params }),
  create: (payload) => clientRequest("create_project_image", payload),
  upload: (projectId, files, captions = [], mainIndex = -1) => {
    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("main_index", String(mainIndex));
    formData.append("captions", captions.join("|"));

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    return clientRequest("upload_project_images", formData);
  },
  remove: (id) => clientRequest("delete_project_image", { id }),
};

export const donationService = {
  list: (params = {}) => clientRequest("list_donations", params),
  get: (id) => clientRequest("get_donation", { id }),
  create: (payload) => clientRequest("create_donation", payload),
  updateStatus: (id, payment_status) => clientRequest("update_donation_status", { id, payment_status }),
  remove: (id) => clientRequest("delete_donation", { id }),
};

export const volunteerService = {
  list: (params = {}) => clientRequest("list_volunteers", params),
  get: (id) => clientRequest("get_volunteer", { id }),
  create: (payload) => clientRequest("create_volunteer", payload),
  updateStatus: (id, status) => clientRequest("update_volunteer_status", { id, status }),
  remove: (id) => clientRequest("delete_volunteer", { id }),
};

export const messageService = {
  list: (params = {}) => clientRequest("list_messages", params),
  get: (id) => clientRequest("get_message", { id }),
  create: (payload) => clientRequest("create_message", payload),
  updateStatus: (id, status) => clientRequest("update_message_status", { id, status }),
  remove: (id) => clientRequest("delete_message", { id }),
};

export const newsletterService = {
  list: (params = {}) => clientRequest("list_newsletter_subscribers", params),
  create: (payload) => clientRequest("create_newsletter_subscriber", payload),
  updateStatus: (id, status) => clientRequest("update_newsletter_subscriber_status", { id, status }),
  remove: (id) => clientRequest("delete_newsletter_subscriber", { id }),
};
