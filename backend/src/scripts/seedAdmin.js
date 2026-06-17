require("../config/env");

const { pool, query } = require("../config/database");
const { hashPassword } = require("../utils/password");

const ADMIN_EMAIL = "admin@iamcharity.com";
const ADMIN_PASSWORD = "admin123321";

const seedAdmin = async () => {
  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  await query(
    `INSERT INTO admins (full_name, email, password_hash, role, status)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       full_name = VALUES(full_name),
       password_hash = VALUES(password_hash),
       role = VALUES(role),
       status = VALUES(status)`,
    ["I AM Charity Admin", ADMIN_EMAIL, passwordHash, "admin", "active"]
  );

  console.log(`Admin account is ready: ${ADMIN_EMAIL}`);
};

seedAdmin()
  .catch((error) => {
    console.error("Failed to seed admin account:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
