const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const volunteerTypeAliases = {
  "give my time": "community_work",
  "give physical help or field support": "construction",
  "offer a professional skill": "administration",
  "contribute money or materials": "other",
};

const allowedVolunteerTypes = new Set([
  "construction",
  "teaching",
  "medical",
  "food_distribution",
  "community_work",
  "administration",
  "other",
]);

const normalizeVolunteerType = (value) => {
  const normalized = String(value || "other").trim().toLowerCase();
  const mappedValue = volunteerTypeAliases[normalized] || normalized;
  return allowedVolunteerTypes.has(mappedValue) ? mappedValue : "other";
};

class Volunteer extends BaseModel {
  static tableName = "volunteers";

  static async create(payload) {
    const result = await query(
      `INSERT INTO volunteers
        (full_name, email, phone, address, image_url, skills, volunteer_type, availability, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.full_name,
        payload.email || null,
        payload.phone,
        payload.address || null,
        payload.image_url || null,
        payload.skills || null,
        normalizeVolunteerType(payload.volunteer_type),
        payload.availability || null,
        payload.message || null,
        payload.status || "pending",
      ]
    );

    return this.findById(this.tableName, result.insertId);
  }

  static async list({ limit, offset, status, volunteer_type }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const { whereClause, params } = this.buildWhere({ status, volunteer_type }, ["status", "volunteer_type"]);

    return query(
      `SELECT * FROM volunteers
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async updateStatus(id, status) {
    if (!["pending", "contacted", "approved", "rejected", "inactive"].includes(status)) {
      throw new HttpError(400, "Invalid volunteer status");
    }

    const existing = await this.findById(this.tableName, id);
    if (!existing) {
      throw new HttpError(404, "Volunteer not found");
    }

    await query("UPDATE volunteers SET status = ? WHERE id = ?", [status, id]);
    return this.findById(this.tableName, id);
  }

  static async delete(id) {
    return this.deleteById(this.tableName, id);
  }
}

module.exports = Volunteer;
