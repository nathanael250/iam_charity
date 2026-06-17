const { query } = require("../config/database");

class ImpactPageHero {
  static async get() {
    const rows = await query("SELECT * FROM impact_page_hero WHERE id = 1 LIMIT 1");
    return rows[0] || { before_image_url: "", after_image_url: "" };
  }

  static async update(payload) {
    const existing = await this.get();
    const next = {
      before_image_url: payload.before_image_url ?? existing.before_image_url,
      after_image_url: payload.after_image_url ?? existing.after_image_url,
      updated_by: payload.updated_by ?? existing.updated_by,
    };

    await query(
      "UPDATE impact_page_hero SET before_image_url = ?, after_image_url = ?, updated_by = ? WHERE id = 1",
      [next.before_image_url || "", next.after_image_url || "", next.updated_by || null]
    );

    return this.get();
  }
}

module.exports = ImpactPageHero;
