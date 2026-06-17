const { query, pool } = require("../config/database");

const defaultStats = [
  ["families_supported", "Families Supported", "0", "Families who have received support", "home", 1],
  ["completed_cases", "Completed Support Cases", "0", "Support cases successfully completed", "verified", 2],
  ["families_housed", "Families Housed", "0", "Since 2018", "home", 3],
  ["stable_housing", "Still in Stable Housing", "0", "After 2 Years", "verified_user", 4],
];

const homepageKeys = defaultStats.map(([key]) => key);

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS impact_statistics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      statistic_key VARCHAR(100) NOT NULL UNIQUE,
      label VARCHAR(150) NOT NULL,
      value VARCHAR(100) NOT NULL DEFAULT '0',
      description VARCHAR(255) NULL,
      icon VARCHAR(100) NULL,
      display_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT TRUE,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  for (const stat of defaultStats) {
    await query(
      `INSERT INTO impact_statistics (statistic_key, label, value, description, icon, display_order, is_visible)
       VALUES (?, ?, ?, ?, ?, ?, TRUE)
       ON DUPLICATE KEY UPDATE
         label = VALUES(label),
         description = VALUES(description),
         icon = VALUES(icon),
         display_order = VALUES(display_order)`,
      stat
    );
  }

  await query(
    `UPDATE impact_statistics
     SET is_visible = FALSE
     WHERE statistic_key NOT IN (${homepageKeys.map(() => "?").join(", ")})`,
    homepageKeys
  );

  console.log("Impact statistics schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
