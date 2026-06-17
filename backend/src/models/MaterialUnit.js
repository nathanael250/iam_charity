const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return ["1", "true", "yes", "on"].includes(String(value).trim().toLowerCase());
};

class MaterialUnit extends BaseModel {
  static tableName = "material_units";

  static async create(payload) {
    const result = await query(
      `INSERT INTO material_units (unit_name, unit_code, description, is_active)
       VALUES (?, ?, ?, ?)`,
      [payload.unit_name, payload.unit_code, payload.description || null, normalizeBoolean(payload.is_active)]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    return BaseModel.findById(this.tableName, id);
  }

  static async list({ limit, offset, is_active, search }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];

    if (is_active !== undefined && is_active !== "") {
      conditions.push("is_active = ?");
      params.push(normalizeBoolean(is_active));
    }
    if (search) {
      conditions.push("(unit_name LIKE ? OR unit_code LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    return query(
      `SELECT *
       FROM material_units
       ${whereClause}
       ORDER BY unit_name ASC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Material unit not found");

    await query(
      `UPDATE material_units
       SET unit_name = ?, unit_code = ?, description = ?, is_active = ?
       WHERE id = ?`,
      [
        payload.unit_name !== undefined ? payload.unit_name : existing.unit_name,
        payload.unit_code !== undefined ? payload.unit_code : existing.unit_code,
        payload.description !== undefined ? payload.description || null : existing.description,
        payload.is_active !== undefined ? normalizeBoolean(payload.is_active) : existing.is_active,
        id,
      ]
    );
    return this.findById(id);
  }

  static async delete(id) {
    return BaseModel.deleteById(this.tableName, id);
  }
}

module.exports = MaterialUnit;
