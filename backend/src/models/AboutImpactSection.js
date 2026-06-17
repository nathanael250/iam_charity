const { query } = require("../config/database");

const defaultSection = {
  impact_image_url: "",
};

class AboutImpactSection {
  static async get() {
    const rows = await query("SELECT * FROM about_impact_section WHERE id = 1 LIMIT 1");
    return rows[0] || defaultSection;
  }

  static async update(payload) {
    const existing = await this.get();
    const next = {
      impact_image_url: payload.impact_image_url ?? existing.impact_image_url,
      updated_by: payload.updated_by ?? existing.updated_by,
    };

    await query(
      `UPDATE about_impact_section
       SET impact_image_url = ?, updated_by = ?
       WHERE id = 1`,
      [next.impact_image_url || "", next.updated_by || null]
    );

    return this.get();
  }
}

module.exports = AboutImpactSection;
