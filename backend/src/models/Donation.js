const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class Donation extends BaseModel {
  static tableName = "donations";

  static async create(payload) {
    const result = await query(
      `INSERT INTO donations
        (project_id, donor_name, donor_email, donor_phone, amount, currency, donation_type,
         payment_method, payment_status, transaction_reference, message, is_anonymous)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.project_id || null,
        payload.donor_name || null,
        payload.donor_email || null,
        payload.donor_phone || null,
        payload.amount || 0,
        payload.currency || "RWF",
        payload.donation_type || "money",
        payload.payment_method || "momo",
        payload.payment_status || "pending",
        payload.transaction_reference || null,
        payload.message || null,
        Boolean(payload.is_anonymous),
      ]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT d.*, p.title AS project_title
       FROM donations d
       LEFT JOIN projects p ON p.id = d.project_id
       WHERE d.id = ?
       LIMIT 1`,
      [id]
    );

    return rows[0] || null;
  }

  static async list({ limit, offset, project_id, payment_status, donation_type }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere(
      { project_id, payment_status, donation_type },
      ["project_id", "payment_status", "donation_type"]
    );

    return query(
      `SELECT d.*, p.title AS project_title
       FROM donations d
       LEFT JOIN projects p ON p.id = d.project_id
       ${whereClause}
       ORDER BY d.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, payment_status) {
    const existing = await this.findById(id);
    if (!existing) {
      throw new HttpError(404, "Donation not found");
    }

    await query("UPDATE donations SET payment_status = ? WHERE id = ?", [payment_status, id]);
    return this.findById(id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Donation;
