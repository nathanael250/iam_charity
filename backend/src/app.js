require("./config/env");

const express = require("express");
const routes = require("./routes/master.routes");
const { uploadsDir } = require("./config/paths");
const HttpError = require("./utils/httpError");

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || defaultAllowedOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  const shouldAllowOrigin =
    !requestOrigin || allowedOrigins.includes("*") || allowedOrigins.includes(requestOrigin);

  if (shouldAllowOrigin) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin || allowedOrigins[0] || "*");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, request, x-command, command, x-resource-id");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

app.use("/", routes);

app.use((_req, _res, next) => {
  next(new HttpError(404, "Route not found"));
});

app.use((error, _req, res, _next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Each image must be 5 MB or smaller",
    });
  }

  if (error.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      success: false,
      message: "You can upload a maximum of 10 images at a time",
    });
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      message: "The image upload field is invalid or contains too many files",
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

module.exports = app;
