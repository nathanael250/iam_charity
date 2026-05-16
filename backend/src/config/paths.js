const path = require("path");

const rootDir = path.resolve(__dirname, "../../");
const uploadsDir = path.join(rootDir, "uploads");
const projectUploadsDir = path.join(uploadsDir, "projects");

module.exports = {
  rootDir,
  uploadsDir,
  projectUploadsDir,
};
