const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class Volunteer extends BaseModel {
  static tableName = "volunteers";

  static async create(payload) {
    const result = await query(
      `INSERT INTO volunteers
        (full_name, email, phone, address, skills, volunteer_type, availability, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.full_name,
        payload.email || null,
        payload.phone,
        payload.address || null,
        payload.skills || null,
        payload.volunteer_type || "other",
        payload.availability || null,
        payload.message || null,
        payload.status || "pending",
      ]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async list({ limit, offset, status, volunteer_type }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ status, volunteer_type }, ["status", "volunteer_type"]);

    return query(
      `SELECT * FROM volunteers
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, status) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) {
      throw new HttpError(404, "Volunteer not found");
    }

    await query("UPDATE volunteers SET status = ? WHERE id = ?", [status, id]);
    return this.findById(this.tableName, id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Volunteer;
