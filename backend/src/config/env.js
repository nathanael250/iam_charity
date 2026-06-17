const path = require("path");

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(path.resolve(__dirname, "../../.env"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
