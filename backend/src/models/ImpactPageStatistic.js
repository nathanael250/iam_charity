const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class ImpactPageStatistic extends BaseModel {
  static tableName = "impact_page_statistics";

  static async list({ include_hidden = false } = {}) {
    return query(
      `SELECT id, statistic_key, label, value, icon, display_order, is_visible
       FROM impact_page_statistics
       ${include_hidden ? "" : "WHERE is_visible = TRUE"}
       ORDER BY display_order ASC, id ASC`
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) throw new HttpError(404, "Impact page statistic not found");
    const next = { ...existing, ...payload };

    await query(
      `UPDATE impact_page_statistics
       SET label = ?, value = ?, icon = ?, display_order = ?, is_visible = ?, updated_by = ?
       WHERE id = ?`,
      [
        next.label,
        String(next.value ?? "0"),
        next.icon || "monitoring",
        Number(next.display_order) || 0,
        Boolean(next.is_visible),
        next.updated_by || null,
        id,
      ]
    );

    return this.findById(this.tableName, id);
  }
}

module.exports = ImpactPageStatistic;
