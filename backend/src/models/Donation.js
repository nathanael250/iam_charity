const crypto = require("crypto");
const { pool, query } = require("../config/database");
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
        payload.currency || "USD",
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

  static async createMockPayment(payload) {
    const amount = Number(payload.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new HttpError(400, "Donation amount must be greater than zero");
    }

    const paymentMethod = String(payload.payment_method || "card");
    if (!["card", "momo", "bank_transfer"].includes(paymentMethod)) {
      throw new HttpError(400, "Invalid payment method");
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const projectId = payload.project_id ? Number(payload.project_id) : null;
      if (projectId) {
        const [projects] = await connection.execute(
          "SELECT id FROM projects WHERE id = ? LIMIT 1 FOR UPDATE",
          [projectId]
        );
        if (!projects.length) throw new HttpError(404, "Selected support case was not found");
      }

      const transactionReference = `MOCK-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
      const [result] = await connection.execute(
        `INSERT INTO donations
          (project_id, donor_name, donor_email, donor_phone, amount, currency, donation_type,
           payment_method, payment_status, transaction_reference, message, is_anonymous)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectId,
          payload.donor_name || null,
          payload.donor_email || null,
          payload.donor_phone || null,
          amount,
          "USD",
          "money",
          paymentMethod,
          "completed",
          transactionReference,
          payload.message || null,
          payload.is_anonymous === true || payload.is_anonymous === "true",
        ]
      );

      if (projectId) {
        await connection.execute(
          "UPDATE projects SET raised_amount = raised_amount + ? WHERE id = ?",
          [amount, projectId]
        );
      }

      await connection.commit();
      return this.findById(result.insertId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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
    if (!["pending", "completed", "failed", "cancelled", "refunded"].includes(payment_status)) {
      throw new HttpError(400, "Invalid payment status");
    }
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
