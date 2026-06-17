const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const allowedCategories = new Set(["food", "education", "housing", "health", "clothing", "hygiene", "construction", "other"]);

const normalizeCategory = (value) => {
  const normalized = String(value || "other").trim();
  return allowedCategories.has(normalized) ? normalized : "other";
};

class MaterialUsed extends BaseModel {
  static tableName = "materials_used";

  static async create(payload) {
    const result = await query(
      `INSERT INTO materials_used
        (beneficiary_id, material_name, category, quantity, unit_id, unit_cost, currency,
         date_used, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.beneficiary_id,
        payload.material_name,
        normalizeCategory(payload.category),
        Math.max(Number(payload.quantity) || 0, 0),
        payload.unit_id,
        Math.max(Number(payload.unit_cost) || 0, 0),
        payload.currency || "USD",
        payload.date_used,
        payload.notes || null,
        payload.created_by || null,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT m.*, b.display_name AS beneficiary_name, u.unit_name, u.unit_code
       FROM materials_used m
       INNER JOIN beneficiaries b ON b.id = m.beneficiary_id
       INNER JOIN material_units u ON u.id = m.unit_id
       WHERE m.id = ?
       LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async list({ limit, offset, beneficiary_id, category, search }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];

    if (beneficiary_id) {
      conditions.push("m.beneficiary_id = ?");
      params.push(beneficiary_id);
    }
    if (category) {
      conditions.push("m.category = ?");
      params.push(category);
    }
    if (search) {
      conditions.push("(m.material_name LIKE ? OR b.display_name LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    return query(
      `SELECT m.*, b.display_name AS beneficiary_name, u.unit_name, u.unit_code
       FROM materials_used m
       INNER JOIN beneficiaries b ON b.id = m.beneficiary_id
       INNER JOIN material_units u ON u.id = m.unit_id
       ${whereClause}
       ORDER BY m.date_used DESC, m.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Material record not found");

    await query(
      `UPDATE materials_used
       SET beneficiary_id = ?, material_name = ?, category = ?, quantity = ?, unit_id = ?,
           unit_cost = ?, currency = ?, date_used = ?, notes = ?
       WHERE id = ?`,
      [
        payload.beneficiary_id !== undefined ? payload.beneficiary_id : existing.beneficiary_id,
        payload.material_name !== undefined ? payload.material_name : existing.material_name,
        payload.category !== undefined ? normalizeCategory(payload.category) : existing.category,
        payload.quantity !== undefined ? Math.max(Number(payload.quantity) || 0, 0) : existing.quantity,
        payload.unit_id !== undefined ? payload.unit_id : existing.unit_id,
        payload.unit_cost !== undefined ? Math.max(Number(payload.unit_cost) || 0, 0) : existing.unit_cost,
        payload.currency !== undefined ? payload.currency || "USD" : existing.currency,
        payload.date_used !== undefined ? payload.date_used : existing.date_used,
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

module.exports = MaterialUsed;
