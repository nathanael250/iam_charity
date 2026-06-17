const { query } = require("../config/database");
const BaseModel = require("./BaseModel");

class ImpactGalleryImage extends BaseModel {
  static tableName = "impact_gallery_images";

  static async create(payload) {
    const result = await query(
      `INSERT INTO impact_gallery_images (project_id, image_url, caption, gallery_position, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
        payload.project_id,
        payload.image_url,
        payload.caption || null,
        payload.gallery_position || null,
        payload.created_by || null,
      ]
    );
    return this.findById(result.insertId);
  }

  static async createMany(images) {
    const created = [];
    for (const image of images) created.push(await this.create(image));
    return created;
  }

  static async findById(id) {
    const rows = await query(
      `SELECT g.*, p.title AS project_title
       FROM impact_gallery_images g
       INNER JOIN projects p ON p.id = g.project_id
       WHERE g.id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async list({ project_id, limit, offset }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const params = [];
    const whereClause = project_id ? "WHERE g.project_id = ?" : "";
    if (project_id) params.push(project_id);
    return query(
      `SELECT g.*, p.title AS project_title
       FROM impact_gallery_images g
       INNER JOIN projects p ON p.id = g.project_id
       ${whereClause}
       ORDER BY COALESCE(g.gallery_position, 99) ASC, g.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async delete(id) {
    const existing = await this.findById(id);
    if (!existing) return this.deleteById(this.tableName, id);
    await query("DELETE FROM impact_gallery_images WHERE id = ?", [id]);
    return existing;
  }
}

module.exports = ImpactGalleryImage;
