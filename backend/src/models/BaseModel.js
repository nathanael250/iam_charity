const { query } = require("../config/database");
const HttpError = require("../utils/httpError");

class BaseModel {
  static async findById(tableName, id) {
    const rows = await query(`SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`, [id]);
    return rows[0] || null;
  }

  static async deleteById(tableName, id) {
    const existing = await this.findById(tableName, id);
    if (!existing) {
      throw new HttpError(404, "Record not found");
    }

    await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return existing;
  }

  static buildWhere(filters = {}, allowed = []) {
    const conditions = [];
    const params = [];

    allowed.forEach((field) => {
      if (filters[field] !== undefined && filters[field] !== null && filters[field] !== "") {
        conditions.push(`${field} = ?`);
        params.push(filters[field]);
      }
    });

    return {
      whereClause: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
      params,
    };
  }

  static safeLimit(limit) {
    return Math.min(Math.max(Number(limit) || 10, 1), 100);
  }

  static safeOffset(offset) {
    return Math.max(Number(offset) || 0, 0);
  }
}

module.exports = BaseModel;
