const { query, pool } = require("../config/database");

const unusedTables = [
  "content_revisions",
  "audit_logs",
  "navigation_links",
  "social_links",
  "site_settings",
  "gallery_items",
  "core_values",
  "cms_page_sections",
  "cms_pages",
  "media_library",
];

const migrate = async () => {
  for (const table of unusedTables) {
    await query(`DROP TABLE IF EXISTS \`${table}\``);
    console.log(`Dropped unused table if present: ${table}`);
  }

  console.log("Unused table cleanup is complete");
};

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
