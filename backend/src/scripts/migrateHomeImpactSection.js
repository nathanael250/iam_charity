const { query, pool } = require("../config/database");

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS home_impact_section (
      id INT PRIMARY KEY DEFAULT 1,
      eyebrow VARCHAR(120) NOT NULL DEFAULT 'Our Impact',
      title VARCHAR(255) NOT NULL DEFAULT 'Real Change.\\nReal People.',
      description TEXT NULL,
      button_label VARCHAR(120) NOT NULL DEFAULT 'See More Stories',
      button_url VARCHAR(255) NOT NULL DEFAULT '/impact-stories',
      before_label VARCHAR(80) NOT NULL DEFAULT 'Before',
      before_image_url VARCHAR(500) NULL,
      after_label VARCHAR(80) NOT NULL DEFAULT 'After',
      after_image_url VARCHAR(500) NULL,
      badge_icon VARCHAR(100) NOT NULL DEFAULT 'home',
      badge_value VARCHAR(100) NOT NULL DEFAULT '0',
      badge_label VARCHAR(120) NOT NULL DEFAULT 'Homes Completed',
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(
    `INSERT INTO home_impact_section
      (id, eyebrow, title, description, button_label, button_url, before_label, after_label, badge_icon, badge_value, badge_label)
     VALUES (1, 'Our Impact', 'Real Change.\\nReal People.', 'We do not just build houses, we build stronger communities and brighter futures.', 'See More Stories', '/impact-stories', 'Before', 'After', 'home', '0', 'Homes Completed')
     ON DUPLICATE KEY UPDATE id = id`
  );

  console.log("Home impact section schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
