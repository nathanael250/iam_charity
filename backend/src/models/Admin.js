const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class Admin extends BaseModel {
  static tableName = "admins";

  static async create(payload) {
    const result = await query(
      `INSERT INTO admins (full_name, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        payload.full_name,
        payload.email,
        payload.password_hash,
        payload.role || "admin",
        payload.status || "active",
      ]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async findById(id) {
    return BaseModel.findById(this.tableName, id);
  }

  static async list({ limit, offset, role, status }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ role, status }, ["role", "status"]);

    return query(
      `SELECT id, full_name, email, role, status, created_at, updated_at
       FROM admins
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) {
      throw new HttpError(404, "Admin not found");
    }

    await query(
      `UPDATE admins
       SET full_name = ?, email = ?, role = ?, status = ?
       WHERE id = ?`,
      [
        payload.full_name || existing.full_name,
        payload.email || existing.email,
        payload.role || existing.role,
        payload.status || existing.status,
        id,
      ]
    );

    return this.findById(id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Admin;
