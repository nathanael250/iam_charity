import {
  donationService,
  messageService,
  newsletterService,
  projectService,
  volunteerService,
} from "./adminServices";

export const dashboardService = {
  getOverview: async () => {
    const [projects, donations, volunteers, messages, subscribers] = await Promise.all([
      projectService.list({ limit: 100 }),
      donationService.list({ limit: 100 }),
      volunteerService.list({ limit: 100 }),
      messageService.list({ limit: 20 }),
      newsletterService.list({ limit: 20 }),
    ]);

    return {
      projects: projects || [],
      donations: donations || [],
      volunteers: volunteers || [],
      messages: messages || [],
      subscribers: subscribers || [],
    };
  },
};

export default dashboardService;
