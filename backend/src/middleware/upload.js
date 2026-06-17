const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { cmsUploadsDir, impactGalleryUploadsDir, impactStoryUploadsDir, projectUploadsDir, volunteerUploadsDir } = require("../config/paths");
const HttpError = require("../utils/httpError");

fs.mkdirSync(projectUploadsDir, { recursive: true });
fs.mkdirSync(volunteerUploadsDir, { recursive: true });
fs.mkdirSync(impactGalleryUploadsDir, { recursive: true });
fs.mkdirSync(impactStoryUploadsDir, { recursive: true });
fs.mkdirSync(cmsUploadsDir, { recursive: true });

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const createStorage = (destination, fallbackName) => multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, destination),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName || fallbackName}${extension}`);
  },
});

const imageFileFilter = (_req, file, callback) => {
  if (!allowedImageTypes.has(file.mimetype)) {
    callback(new HttpError(400, "Supported image types are JPG, PNG, WEBP, and GIF"));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage: createStorage(projectUploadsDir, "project"),
  fileFilter: imageFileFilter,
  limits: {
    files: 10,
    fileSize: 5 * 1024 * 1024,
  },
});

const volunteerUpload = multer({
  storage: createStorage(volunteerUploadsDir, "volunteer"),
  fileFilter: imageFileFilter,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024,
  },
});

const impactGalleryUpload = multer({
  storage: createStorage(impactGalleryUploadsDir, "impact"),
  fileFilter: imageFileFilter,
  limits: {
    files: 10,
    fileSize: 5 * 1024 * 1024,
  },
});

const impactStoryUpload = multer({
  storage: createStorage(impactStoryUploadsDir, "impact-story"),
  fileFilter: imageFileFilter,
  limits: {
    files: 2,
    fileSize: 5 * 1024 * 1024,
  },
});

const cmsUpload = multer({
  storage: createStorage(cmsUploadsDir, "cms"),
  fileFilter: imageFileFilter,
  limits: {
    files: 2,
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  upload,
  volunteerUpload,
  impactGalleryUpload,
  impactStoryUpload,
  cmsUpload,
};
