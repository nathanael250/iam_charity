const { query, pool } = require("../config/database");

const defaults = [
  [
    "It feels amazing to know my contribution helped build a home for a family. This organization is truly making a difference.",
    "Anita M.",
    "Donor",
    "AM",
    1,
  ],
  [
    "Volunteering with this team opened my eyes. The love and dedication here is inspiring.",
    "Jean Paul.",
    "Volunteer",
    "JP",
    2,
  ],
  [
    "Transparent, trustworthy, and effective. I am proud to support such an incredible mission.",
    "Sarah K.",
    "Monthly Donor",
    "SK",
    3,
  ],
];

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS home_testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote TEXT NOT NULL,
      name VARCHAR(150) NOT NULL,
      role VARCHAR(150) NULL,
      initials VARCHAR(12) NULL,
      display_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT TRUE,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const rows = await query("SELECT COUNT(*) AS total FROM home_testimonials");
  if (!Number(rows[0]?.total || 0)) {
    for (const item of defaults) {
      await query(
        `INSERT INTO home_testimonials (quote, name, role, initials, display_order, is_visible)
         VALUES (?, ?, ?, ?, ?, TRUE)`,
        item
      );
    }
  }

  console.log("Home testimonials schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
