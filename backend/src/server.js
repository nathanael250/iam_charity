require("./config/env");

if (process.env.NODE_ENV === "production" && !process.env.AUTH_TOKEN_SECRET) {
  console.error("AUTH_TOKEN_SECRET is required in production");
  process.exit(1);
}

const app = require("./app");
const { pool } = require("./config/database");

const port = Number(process.env.PORT || 5001);

const start = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
