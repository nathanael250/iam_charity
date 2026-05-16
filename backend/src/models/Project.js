const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

class Project extends BaseModel {
  static tableName = "projects";

  static async create(payload) {
    const result = await query(
      `INSERT INTO projects
        (title, slug, short_description, full_description, category, location, target_amount,
         raised_amount, main_image, status, start_date, end_date, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.title,
        payload.slug,
        payload.short_description || null,
        payload.full_description || null,
        payload.category || "housing",
        payload.location || null,
        payload.target_amount || 0,
        payload.raised_amount || 0,
        payload.main_image || null,
        payload.status || "draft",
        payload.start_date || null,
        payload.end_date || null,
        payload.created_by || null,
      ]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT p.*, a.full_name AS created_by_name,
              CASE
                WHEN p.target_amount > 0 THEN ROUND((p.raised_amount / p.target_amount) * 100)
                ELSE 0
              END AS progress
       FROM projects p
       LEFT JOIN admins a ON a.id = p.created_by
       WHERE p.id = ?
       LIMIT 1`,
      [id]
    );

    return rows[0] || null;
  }

  static async list({ limit, offset, category, status, search }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];

    if (category) {
      conditions.push("p.category = ?");
      params.push(category);
    }

    if (status) {
      conditions.push("p.status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push("(p.title LIKE ? OR p.short_description LIKE ? OR p.location LIKE ?)");
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    return query(
      `SELECT p.*, a.full_name AS created_by_name,
              CASE
                WHEN p.target_amount > 0 THEN ROUND((p.raised_amount / p.target_amount) * 100)
                ELSE 0
              END AS progress
       FROM projects p
       LEFT JOIN admins a ON a.id = p.created_by
       ${whereClause}
       ORDER BY p.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) {
      throw new HttpError(404, "Project not found");
    }

    await query(
      `UPDATE projects
       SET title = ?, slug = ?, short_description = ?, full_description = ?, category = ?,
           location = ?, target_amount = ?, raised_amount = ?, main_image = ?, status = ?,
           start_date = ?, end_date = ?, created_by = ?
       WHERE id = ?`,
      [
        payload.title || existing.title,
        payload.slug || existing.slug,
        payload.short_description !== undefined ? payload.short_description : existing.short_description,
        payload.full_description !== undefined ? payload.full_description : existing.full_description,
        payload.category || existing.category,
        payload.location !== undefined ? payload.location : existing.location,
        payload.target_amount !== undefined ? payload.target_amount : existing.target_amount,
        payload.raised_amount !== undefined ? payload.raised_amount : existing.raised_amount,
        payload.main_image !== undefined ? payload.main_image : existing.main_image,
        payload.status || existing.status,
        payload.start_date !== undefined ? payload.start_date : existing.start_date,
        payload.end_date !== undefined ? payload.end_date : existing.end_date,
        payload.created_by !== undefined ? payload.created_by : existing.created_by,
        id,
      ]
    );

    return this.findById(id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Project;
