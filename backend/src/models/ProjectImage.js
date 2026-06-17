const { query } = require("../config/database");
const BaseModel = require("./BaseModel");

class ProjectImage extends BaseModel {
  static tableName = "project_images";

  static async create(payload) {
    const result = await query(
      `INSERT INTO project_images (project_id, image_url, caption, is_main)
       VALUES (?, ?, ?, ?)`,
      [payload.project_id, payload.image_url, payload.caption || null, Boolean(payload.is_main)]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async createMany(projectId, images) {
    const createdImages = [];

    if (images.some((image) => image.is_main)) {
      await query("UPDATE project_images SET is_main = FALSE WHERE project_id = ?", [projectId]);
    }

    for (const image of images) {
      const createdImage = await this.create({
        project_id: projectId,
        image_url: image.image_url,
        caption: image.caption,
        is_main: image.is_main,
      });
      createdImages.push(createdImage);
    }

    return createdImages;
  }

  static async list({ project_id, limit, offset }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ project_id }, ["project_id"]);

    return query(
      `SELECT * FROM project_images
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = ProjectImage;
