const { query, pool } = require("../config/database");

const stats = [
  ["families_helped", "Families Helped", "0", "groups", 1],
  ["volunteers_involved", "Volunteers Involved", "0", "volunteer_activism", 2],
  ["supporters", "Supporters", "0", "favorite", 3],
  ["communities_reached", "Communities Reached", "0", "location_on", 4],
];

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS impact_page_hero (
      id INT PRIMARY KEY DEFAULT 1,
      before_image_url VARCHAR(500) NULL,
      after_image_url VARCHAR(500) NULL,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS impact_page_statistics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      statistic_key VARCHAR(100) NOT NULL UNIQUE,
      label VARCHAR(150) NOT NULL,
      value VARCHAR(100) NOT NULL DEFAULT '0',
      icon VARCHAR(100) NULL,
      display_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT TRUE,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query("INSERT INTO impact_page_hero (id, before_image_url, after_image_url) VALUES (1, '', '') ON DUPLICATE KEY UPDATE id = id");

  for (const stat of stats) {
    await query(
      `INSERT INTO impact_page_statistics (statistic_key, label, value, icon, display_order, is_visible)
       VALUES (?, ?, ?, ?, ?, TRUE)
       ON DUPLICATE KEY UPDATE label = VALUES(label), icon = VALUES(icon), display_order = VALUES(display_order)`,
      stat
    );
  }

  console.log("Impact page CMS schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
