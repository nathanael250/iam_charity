const { query } = require("../config/database");

const defaultSection = {
  eyebrow: "Our Impact",
  title: "Real Change.\nReal People.",
  description: "We do not just build houses, we build stronger communities and brighter futures.",
  button_label: "See More Stories",
  button_url: "/impact-stories",
  before_label: "Before",
  before_image_url: "",
  after_label: "After",
  after_image_url: "",
  badge_icon: "home",
  badge_value: "0",
  badge_label: "Homes Completed",
};

class HomeImpactSection {
  static async get() {
    const rows = await query("SELECT * FROM home_impact_section WHERE id = 1 LIMIT 1");
    return rows[0] || defaultSection;
  }

  static async update(payload) {
    const existing = await this.get();
    const next = {
      ...existing,
      badge_value: payload.badge_value ?? existing.badge_value,
      before_image_url: payload.before_image_url ?? existing.before_image_url,
      after_image_url: payload.after_image_url ?? existing.after_image_url,
      updated_by: payload.updated_by ?? existing.updated_by,
    };

    await query(
      `UPDATE home_impact_section
       SET eyebrow = ?, title = ?, description = ?, button_label = ?, button_url = ?,
           before_label = ?, before_image_url = ?, after_label = ?, after_image_url = ?,
           badge_icon = ?, badge_value = ?, badge_label = ?, updated_by = ?
       WHERE id = 1`,
      [
        next.eyebrow || defaultSection.eyebrow,
        next.title || defaultSection.title,
        next.description || "",
        next.button_label || defaultSection.button_label,
        next.button_url || defaultSection.button_url,
        next.before_label || defaultSection.before_label,
        next.before_image_url || "",
        next.after_label || defaultSection.after_label,
        next.after_image_url || "",
        next.badge_icon || defaultSection.badge_icon,
        next.badge_value || "0",
        next.badge_label || defaultSection.badge_label,
        next.updated_by || null,
      ]
    );

    return this.get();
  }
}

module.exports = HomeImpactSection;
