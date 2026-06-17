const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class ImpactStatistic extends BaseModel {
  static tableName = "impact_statistics";

  static async list({ include_hidden = false } = {}) {
    const rows = await query(
      `SELECT id, statistic_key, label, value, description, icon, display_order, is_visible
       FROM impact_statistics
       ${include_hidden ? "" : "WHERE is_visible = TRUE"}
       ORDER BY display_order ASC, id ASC`
    );
    return rows;
  }

  static async update(id, payload) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) throw new HttpError(404, "Impact statistic not found");

    const next = {
      label: payload.label ?? existing.label,
      value: payload.value ?? existing.value,
      description: payload.description ?? existing.description,
      icon: payload.icon ?? existing.icon,
      display_order: payload.display_order ?? existing.display_order,
      is_visible: payload.is_visible ?? existing.is_visible,
      updated_by: payload.updated_by ?? existing.updated_by,
    };

    await query(
      `UPDATE impact_statistics
       SET label = ?, value = ?, description = ?, icon = ?, display_order = ?, is_visible = ?, updated_by = ?
       WHERE id = ?`,
      [
        next.label,
        String(next.value ?? "0"),
        next.description || null,
        next.icon || "bar_chart",
        Number(next.display_order) || 0,
        Boolean(next.is_visible),
        next.updated_by || null,
        id,
      ]
    );

    return this.findById(this.tableName, id);
  }
}

module.exports = ImpactStatistic;
