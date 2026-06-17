const path = require("path");

const rootDir = path.resolve(__dirname, "../../");
const uploadsDir = path.join(rootDir, "uploads");
const projectUploadsDir = path.join(uploadsDir, "projects");
const volunteerUploadsDir = path.join(uploadsDir, "volunteers");
const impactGalleryUploadsDir = path.join(uploadsDir, "impact-gallery");
const impactStoryUploadsDir = path.join(uploadsDir, "impact-stories");
const cmsUploadsDir = path.join(uploadsDir, "cms");

module.exports = {
  rootDir,
  uploadsDir,
  projectUploadsDir,
  volunteerUploadsDir,
  impactGalleryUploadsDir,
  impactStoryUploadsDir,
  cmsUploadsDir,
};
