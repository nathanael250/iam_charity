import { clientRequest } from "./clientService";

export const projectService = {
  list: (params = {}) => clientRequest("list_projects", params),
  get: (id) => clientRequest("get_project", { id }),
  create: (payload) => clientRequest("create_project", payload),
  update: (id, payload) => clientRequest("update_project", { id, ...payload }),
  remove: (id) => clientRequest("delete_project", { id }),
};

export const projectImageService = {
  list: (projectId, params = {}) => {
    if (projectId === undefined || projectId === null || projectId === "") {
      return Promise.reject(new Error("A project ID is required to load project images"));
    }

    return clientRequest("list_project_images", { ...params, project_id: projectId, limit: 100 });
  },
  create: (payload) => clientRequest("create_project_image", payload),
  upload: (projectId, files, captions = [], mainIndex = -1) => {
    if (projectId === undefined || projectId === null || projectId === "") {
      return Promise.reject(new Error("A project ID is required to upload project images"));
    }

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

export const impactUpdateService = {
  list: (params = {}) => clientRequest("list_project_updates", params),
  create: (payload, beforeImage, afterImage) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value ?? ""));
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);
    return clientRequest("create_project_update", formData);
  },
  update: (id, payload, beforeImage, afterImage) => {
    const formData = new FormData();
    formData.append("id", id);
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value ?? ""));
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);
    return clientRequest("update_project_update", formData);
  },
  updateImages: (id, beforeImage, afterImage) => {
    const formData = new FormData();
    formData.append("id", id);
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);
    return clientRequest("update_project_update_images", formData);
  },
  updateStatus: (id, status) => clientRequest("update_project_update_status", { id, status }),
  remove: (id) => clientRequest("delete_project_update", { id }),
};

export const impactGalleryService = {
  list: (params = {}) => clientRequest("list_impact_gallery_images", { limit: 100, ...params }),
  upload: (projectId, files, captions = [], positions = []) => {
    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("captions", captions.join("|"));
    formData.append("positions", positions.join("|"));
    Array.from(files).forEach((file) => formData.append("images", file));
    return clientRequest("upload_impact_gallery_images", formData);
  },
  remove: (id) => clientRequest("delete_impact_gallery_image", { id }),
};

export const impactStatisticService = {
  list: (params = {}) => clientRequest("list_impact_statistics", params),
  update: (id, payload) => clientRequest("update_impact_statistic", { id, ...payload }),
};

export const homeImpactService = {
  get: () => clientRequest("get_home_impact_section"),
  update: (payload, beforeImage, afterImage) => {
    const formData = new FormData();
    formData.append("badge_value", payload.badge_value ?? "0");
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);
    return clientRequest("update_home_impact_section", formData);
  },
};

export const homeTestimonialService = {
  list: (params = {}) => clientRequest("list_home_testimonials", params),
  create: (payload) => clientRequest("create_home_testimonial", payload),
  update: (id, payload) => clientRequest("update_home_testimonial", { id, ...payload }),
  remove: (id) => clientRequest("delete_home_testimonial", { id }),
};

export const aboutImpactService = {
  get: () => clientRequest("get_about_impact_section"),
  update: (image) => {
    const formData = new FormData();
    if (image) formData.append("impact_image", image);
    return clientRequest("update_about_impact_section", formData);
  },
};

export const impactPageHeroService = {
  get: () => clientRequest("get_impact_page_hero"),
  update: (beforeImage, afterImage) => {
    const formData = new FormData();
    if (beforeImage) formData.append("before_image", beforeImage);
    if (afterImage) formData.append("after_image", afterImage);
    return clientRequest("update_impact_page_hero", formData);
  },
};

export const impactPageStatisticService = {
  list: (params = {}) => clientRequest("list_impact_page_statistics", params),
  update: (id, payload) => clientRequest("update_impact_page_statistic", { id, ...payload }),
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
  create: (payload, image) => {
    if (!image) return clientRequest("create_volunteer", payload);

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value ?? ""));
    formData.append("image", image);
    return clientRequest("create_volunteer", formData);
  },
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
