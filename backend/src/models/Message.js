const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class Message extends BaseModel {
  static tableName = "messages";

  static async create(payload) {
    const result = await query(
      `INSERT INTO messages (full_name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        payload.full_name,
        payload.email || null,
        payload.phone || null,
        payload.subject || null,
        payload.message,
        payload.status || "unread",
      ]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async list({ limit, offset, status }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ status }, ["status"]);

    return query(
      `SELECT * FROM messages
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, status) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) {
      throw new HttpError(404, "Message not found");
    }

    await query("UPDATE messages SET status = ? WHERE id = ?", [status, id]);
    return this.findById(this.tableName, id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Message;
