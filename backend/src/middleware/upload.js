const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { projectUploadsDir } = require("../config/paths");
const HttpError = require("../utils/httpError");

fs.mkdirSync(projectUploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, projectUploadsDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName || "project"}${extension}`);
  },
});

const imageFileFilter = (_req, file, callback) => {
  if (!file.mimetype.startsWith("image/")) {
    callback(new HttpError(400, "Only image files are allowed"));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    files: 10,
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  upload,
};
