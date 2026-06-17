const { query, pool } = require("../config/database");

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS about_impact_section (
      id INT PRIMARY KEY DEFAULT 1,
      impact_image_url VARCHAR(500) NULL,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(
    `INSERT INTO about_impact_section (id, impact_image_url)
     VALUES (1, '')
     ON DUPLICATE KEY UPDATE id = id`
  );

  console.log("About impact section schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
