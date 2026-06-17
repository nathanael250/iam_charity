require("../config/env");

const { pool, query } = require("../config/database");

const migrate = async () => {
  const columns = await query("SHOW COLUMNS FROM volunteers LIKE 'image_url'");
  if (columns.length) {
    console.log("Volunteer image column already exists");
    return;
  }

  await query("ALTER TABLE volunteers ADD COLUMN image_url VARCHAR(500) NULL AFTER address");
  console.log("Volunteer image column added");
};

migrate()
  .catch((error) => {
    console.error("Failed to add volunteer image column:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
