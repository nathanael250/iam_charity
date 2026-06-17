require("../config/env");

const { pool, query } = require("../config/database");

const columns = [
  ["support_summary", "ALTER TABLE project_updates ADD COLUMN support_summary TEXT NULL AFTER description"],
  ["before_image_url", "ALTER TABLE project_updates ADD COLUMN before_image_url VARCHAR(500) NULL AFTER image_url"],
  ["after_image_url", "ALTER TABLE project_updates ADD COLUMN after_image_url VARCHAR(500) NULL AFTER before_image_url"],
  ["amount_delivered", "ALTER TABLE project_updates ADD COLUMN amount_delivered DECIMAL(12,2) DEFAULT 0.00 AFTER support_summary"],
  ["people_helped", "ALTER TABLE project_updates ADD COLUMN people_helped INT UNSIGNED DEFAULT 0 AFTER amount_delivered"],
  ["completion_date", "ALTER TABLE project_updates ADD COLUMN completion_date DATE NULL AFTER people_helped"],
  ["status", "ALTER TABLE project_updates ADD COLUMN status ENUM('draft','published','archived') DEFAULT 'draft' AFTER completion_date"],
  ["created_by", "ALTER TABLE project_updates ADD COLUMN created_by INT NULL AFTER status"],
  ["published_at", "ALTER TABLE project_updates ADD COLUMN published_at DATETIME NULL AFTER created_by"],
  ["updated_at", "ALTER TABLE project_updates ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at"],
];

const migrate = async () => {
  for (const [name, sql] of columns) {
    const existing = await query(`SHOW COLUMNS FROM project_updates LIKE '${name}'`);
    if (!existing.length) await query(sql);
  }
  console.log("Impact updates schema is ready");
};

migrate()
  .catch((error) => {
    console.error("Failed to migrate impact updates:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => pool.end());
