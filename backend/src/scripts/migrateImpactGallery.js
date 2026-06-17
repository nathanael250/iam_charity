const { query, pool } = require("../config/database");

const migrate = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS impact_gallery_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      project_id INT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      caption VARCHAR(255) NULL,
      gallery_position TINYINT UNSIGNED NULL,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_impact_gallery_project
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
  `);
  const positionColumn = await query("SHOW COLUMNS FROM impact_gallery_images LIKE 'gallery_position'");
  if (!positionColumn.length) {
    await query("ALTER TABLE impact_gallery_images ADD COLUMN gallery_position TINYINT UNSIGNED NULL AFTER caption");
  }
  const positioned = await query("SELECT COUNT(*) AS total FROM impact_gallery_images WHERE gallery_position BETWEEN 1 AND 4");
  if (!Number(positioned[0]?.total || 0)) {
    const existing = await query("SELECT id FROM impact_gallery_images ORDER BY id DESC LIMIT 4");
    for (const [index, image] of existing.entries()) {
      await query("UPDATE impact_gallery_images SET gallery_position = ? WHERE id = ?", [index + 1, image.id]);
    }
  }
  console.log("Impact gallery schema is ready");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
