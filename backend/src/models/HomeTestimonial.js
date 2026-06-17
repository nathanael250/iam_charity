const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class HomeTestimonial extends BaseModel {
  static tableName = "home_testimonials";

  static async list({ include_hidden = false, limit, offset } = {}) {
    const safeLimit = this.safeLimit(limit || 50);
    const safeOffset = this.safeOffset(offset);
    return query(
      `SELECT *
       FROM home_testimonials
       ${include_hidden ? "" : "WHERE is_visible = TRUE"}
       ORDER BY display_order ASC, id ASC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`
    );
  }

  static async create(payload) {
    const result = await query(
      `INSERT INTO home_testimonials (quote, name, role, initials, display_order, is_visible, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.quote,
        payload.name,
        payload.role || null,
        payload.initials || this.initialsFromName(payload.name),
        Number(payload.display_order) || 0,
        payload.is_visible === undefined ? true : Boolean(payload.is_visible),
        payload.updated_by || null,
      ]
    );
    return this.findById(this.tableName, result.insertId);
  }

  static async update(id, payload) {
    const existing = await this.findById(this.tableName, id);
    if (!existing) throw new HttpError(404, "Testimonial not found");
    const next = { ...existing, ...payload };

    await query(
      `UPDATE home_testimonials
       SET quote = ?, name = ?, role = ?, initials = ?, display_order = ?, is_visible = ?, updated_by = ?
       WHERE id = ?`,
      [
        next.quote,
        next.name,
        next.role || null,
        next.initials || this.initialsFromName(next.name),
        Number(next.display_order) || 0,
        Boolean(next.is_visible),
        next.updated_by || null,
        id,
      ]
    );
    return this.findById(this.tableName, id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }

  static initialsFromName(name = "") {
    return String(name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SP";
  }
}

module.exports = HomeTestimonial;
