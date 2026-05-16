const { query } = require("../config/database");
const BaseModel = require("./BaseModel");

class ProjectUpdate extends BaseModel {
  static tableName = "project_updates";

  static async create(payload) {
    const result = await query(
      `INSERT INTO project_updates (project_id, title, description, image_url)
       VALUES (?, ?, ?, ?)`,
      [payload.project_id, payload.title, payload.description || null, payload.image_url || null]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async list({ project_id, limit, offset }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ project_id }, ["project_id"]);

    return query(
      `SELECT * FROM project_updates
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

module.exports = ProjectUpdate;
