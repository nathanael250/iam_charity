const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const allowedStatuses = new Set(["draft", "published", "archived"]);

class ProjectUpdate extends BaseModel {
  static tableName = "project_updates";

  static async create(payload) {
    const status = allowedStatuses.has(payload.status) ? payload.status : "draft";
    const result = await query(
      `INSERT INTO project_updates
        (project_id, title, description, support_summary, amount_delivered, people_helped,
         completion_date, status, created_by, published_at, image_url, before_image_url, after_image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.project_id,
        payload.title,
        payload.description || null,
        payload.support_summary || null,
        Math.max(Number(payload.amount_delivered) || 0, 0),
        Math.max(Number(payload.people_helped) || 0, 0),
        payload.completion_date || null,
        status,
        payload.created_by || null,
        status === "published" ? new Date() : null,
        payload.image_url || null,
        payload.before_image_url || null,
        payload.after_image_url || null,
      ]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT u.*, p.title AS project_title, p.slug AS project_slug, a.full_name AS created_by_name
       FROM project_updates u
       INNER JOIN projects p ON p.id = u.project_id
       LEFT JOIN admins a ON a.id = u.created_by
       WHERE u.id = ?
       LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async list({ project_id, status, limit, offset }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];
    if (project_id) {
      conditions.push("u.project_id = ?");
      params.push(project_id);
    }
    if (status) {
      conditions.push("u.status = ?");
      params.push(status);
    }
    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    return query(
      `SELECT u.*, p.title AS project_title, p.slug AS project_slug, a.full_name AS created_by_name
       FROM project_updates u
       INNER JOIN projects p ON p.id = u.project_id
       LEFT JOIN admins a ON a.id = u.created_by
       ${whereClause}
       ORDER BY COALESCE(u.completion_date, DATE(u.created_at)) DESC, u.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, status) {
    if (!allowedStatuses.has(status)) throw new HttpError(400, "Invalid impact update status");
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Impact update not found");

    await query(
      `UPDATE project_updates
       SET status = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, NOW()) ELSE published_at END
       WHERE id = ?`,
      [status, status, id]
    );
    return this.findById(id);
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Impact update not found");

    const status = payload.status !== undefined
      ? (allowedStatuses.has(payload.status) ? payload.status : existing.status)
      : existing.status;

    await query(
      `UPDATE project_updates
       SET project_id = ?, title = ?, description = ?, support_summary = ?,
           amount_delivered = ?, people_helped = ?, completion_date = ?, status = ?,
           published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, NOW()) ELSE published_at END,
           image_url = ?, before_image_url = ?, after_image_url = ?
       WHERE id = ?`,
      [
        payload.project_id !== undefined ? payload.project_id : existing.project_id,
        payload.title !== undefined ? payload.title : existing.title,
        payload.description !== undefined ? payload.description || null : existing.description,
        payload.support_summary !== undefined ? payload.support_summary || null : existing.support_summary,
        payload.amount_delivered !== undefined ? Math.max(Number(payload.amount_delivered) || 0, 0) : existing.amount_delivered,
        payload.people_helped !== undefined ? Math.max(Number(payload.people_helped) || 0, 0) : existing.people_helped,
        payload.completion_date !== undefined ? payload.completion_date || null : existing.completion_date,
        status,
        status,
        payload.image_url !== undefined ? payload.image_url || null : existing.image_url,
        payload.before_image_url !== undefined ? payload.before_image_url || null : existing.before_image_url,
        payload.after_image_url !== undefined ? payload.after_image_url || null : existing.after_image_url,
        id,
      ]
    );
    return this.findById(id);
  }

  static async updateImages(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Impact update not found");

    await query(
      `UPDATE project_updates
       SET before_image_url = ?, after_image_url = ?
       WHERE id = ?`,
      [
        payload.before_image_url !== undefined ? payload.before_image_url : existing.before_image_url,
        payload.after_image_url !== undefined ? payload.after_image_url : existing.after_image_url,
        id,
      ]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Impact update not found");
    await query("DELETE FROM project_updates WHERE id = ?", [id]);
    return existing;
  }
}

module.exports = ProjectUpdate;
