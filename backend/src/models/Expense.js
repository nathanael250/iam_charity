const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const allowedPaymentMethods = new Set(["cash", "mobile_money", "bank_transfer", "card", "other"]);

const normalizePaymentMethod = (value) => {
  const normalized = String(value || "cash").trim();
  return allowedPaymentMethods.has(normalized) ? normalized : "cash";
};

class Expense extends BaseModel {
  static tableName = "expenses";

  static async create(payload) {
    const result = await query(
      `INSERT INTO expenses
        (project_id, beneficiary_id, expense_category_id, description, amount, currency, expense_date,
         paid_to, payment_method, reference, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.project_id,
        payload.beneficiary_id || null,
        payload.expense_category_id,
        payload.description,
        Math.max(Number(payload.amount) || 0, 0),
        payload.currency || "USD",
        payload.expense_date,
        payload.paid_to || null,
        normalizePaymentMethod(payload.payment_method),
        payload.reference || null,
        payload.notes || null,
        payload.created_by || null,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT e.*, p.title AS project_title, b.display_name AS beneficiary_name, c.category_name, c.category_code
       FROM expenses e
       LEFT JOIN projects p ON p.id = e.project_id
       LEFT JOIN beneficiaries b ON b.id = e.beneficiary_id
       INNER JOIN expense_categories c ON c.id = e.expense_category_id
       WHERE e.id = ?
       LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async list({ limit, offset, project_id, beneficiary_id, expense_category_id, search }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];

    if (project_id) {
      conditions.push("e.project_id = ?");
      params.push(project_id);
    }
    if (beneficiary_id) {
      conditions.push("e.beneficiary_id = ?");
      params.push(beneficiary_id);
    }
    if (expense_category_id) {
      conditions.push("e.expense_category_id = ?");
      params.push(expense_category_id);
    }
    if (search) {
      conditions.push("(e.description LIKE ? OR e.paid_to LIKE ? OR p.title LIKE ? OR b.display_name LIKE ?)");
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    return query(
      `SELECT e.*, p.title AS project_title, b.display_name AS beneficiary_name, c.category_name, c.category_code
       FROM expenses e
       LEFT JOIN projects p ON p.id = e.project_id
       LEFT JOIN beneficiaries b ON b.id = e.beneficiary_id
       INNER JOIN expense_categories c ON c.id = e.expense_category_id
       ${whereClause}
       ORDER BY e.expense_date DESC, e.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Expense not found");

    await query(
      `UPDATE expenses
       SET project_id = ?, beneficiary_id = ?, expense_category_id = ?, description = ?, amount = ?,
           currency = ?, expense_date = ?, paid_to = ?, payment_method = ?,
           reference = ?, notes = ?
       WHERE id = ?`,
      [
        payload.project_id !== undefined ? payload.project_id : existing.project_id,
        payload.beneficiary_id !== undefined ? payload.beneficiary_id || null : existing.beneficiary_id,
        payload.expense_category_id !== undefined ? payload.expense_category_id : existing.expense_category_id,
        payload.description !== undefined ? payload.description : existing.description,
        payload.amount !== undefined ? Math.max(Number(payload.amount) || 0, 0) : existing.amount,
        payload.currency !== undefined ? payload.currency || "USD" : existing.currency,
        payload.expense_date !== undefined ? payload.expense_date : existing.expense_date,
        payload.paid_to !== undefined ? payload.paid_to || null : existing.paid_to,
        payload.payment_method !== undefined ? normalizePaymentMethod(payload.payment_method) : existing.payment_method,
        payload.reference !== undefined ? payload.reference || null : existing.reference,
        payload.notes !== undefined ? payload.notes || null : existing.notes,
        id,
      ]
    );
    return this.findById(id);
  }

  static async delete(id) {
    return BaseModel.deleteById(this.tableName, id);
  }
}

module.exports = Expense;
