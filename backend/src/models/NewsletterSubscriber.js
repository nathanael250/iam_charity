const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class NewsletterSubscriber extends BaseModel {
  static tableName = "newsletter_subscribers";

  static async create(payload) {
    const result = await query(
      "INSERT INTO newsletter_subscribers (email, status) VALUES (?, ?)",
      [payload.email, payload.status || "active"]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async list({ limit, offset, status }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ status }, ["status"]);

    return query(
      `SELECT * FROM newsletter_subscribers
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, status) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) {
      throw new HttpError(404, "Newsletter subscriber not found");
    }

    await query("UPDATE newsletter_subscribers SET status = ? WHERE id = ?", [status, id]);
    return this.findById(this.tableName, id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = NewsletterSubscriber;
