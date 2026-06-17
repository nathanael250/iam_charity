const { query } = require("../config/database");
const BaseModel = require("./BaseModel");
const HttpError = require("../utils/httpError");

const allowedTypes = new Set(["individual", "family"]);
const allowedIdentifierTypes = new Set(["national_id", "passport", "refugee_id", "village_id", "phone", "none", "other"]);
const allowedRepresentativeRoles = new Set(["self", "family_leader", "parent", "guardian", "other"]);
const allowedStatuses = new Set(["active", "completed", "inactive"]);

const normalize = (value, allowed, fallback) => {
  const normalized = String(value || fallback).trim();
  return allowed.has(normalized) ? normalized : fallback;
};

const generateCode = () => `BEN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

class Beneficiary extends BaseModel {
  static tableName = "beneficiaries";

  static async create(payload) {
    const result = await query(
      `INSERT INTO beneficiaries
        (beneficiary_code, display_name, beneficiary_type, identifier_type, identifier_value,
         representative_name, representative_role, representative_phone, contact_name,
         contact_relationship, contact_phone, alternate_contact_phone, location, people_count,
         status, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.beneficiary_code || generateCode(),
        payload.display_name,
        normalize(payload.beneficiary_type, allowedTypes, "family"),
        normalize(payload.identifier_type, allowedIdentifierTypes, "none"),
        payload.identifier_value || null,
        payload.representative_name || null,
        normalize(payload.representative_role, allowedRepresentativeRoles, "self"),
        payload.representative_phone || null,
        payload.contact_name || null,
        payload.contact_relationship || null,
        payload.contact_phone,
        payload.alternate_contact_phone || null,
        payload.location || null,
        Math.max(Number(payload.people_count) || 1, 1),
        normalize(payload.status, allowedStatuses, "active"),
        payload.notes || null,
        payload.created_by || null,
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    return BaseModel.findById(this.tableName, id);
  }

  static async list({ limit, offset, beneficiary_type, status, search }) {
    const safeLimit = this.safeLimit(limit);
    const safeOffset = this.safeOffset(offset);
    const conditions = [];
    const params = [];

    if (beneficiary_type) {
      conditions.push("beneficiary_type = ?");
      params.push(beneficiary_type);
    }
    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }
    if (search) {
      conditions.push("(display_name LIKE ? OR beneficiary_code LIKE ? OR contact_phone LIKE ? OR representative_name LIKE ?)");
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    return query(
      `SELECT *
       FROM beneficiaries
       ${whereClause}
       ORDER BY id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    );
  }

  static async update(id, payload) {
    const existing = await this.findById(id);
    if (!existing) throw new HttpError(404, "Beneficiary not found");

    await query(
      `UPDATE beneficiaries
       SET beneficiary_code = ?, display_name = ?, beneficiary_type = ?, identifier_type = ?,
           identifier_value = ?, representative_name = ?, representative_role = ?,
           representative_phone = ?, contact_name = ?, contact_relationship = ?, contact_phone = ?,
           alternate_contact_phone = ?, location = ?, people_count = ?, status = ?, notes = ?
       WHERE id = ?`,
      [
        payload.beneficiary_code !== undefined ? payload.beneficiary_code : existing.beneficiary_code,
        payload.display_name !== undefined ? payload.display_name : existing.display_name,
        payload.beneficiary_type !== undefined ? normalize(payload.beneficiary_type, allowedTypes, existing.beneficiary_type) : existing.beneficiary_type,
        payload.identifier_type !== undefined ? normalize(payload.identifier_type, allowedIdentifierTypes, existing.identifier_type) : existing.identifier_type,
        payload.identifier_value !== undefined ? payload.identifier_value || null : existing.identifier_value,
        payload.representative_name !== undefined ? payload.representative_name || null : existing.representative_name,
        payload.representative_role !== undefined ? normalize(payload.representative_role, allowedRepresentativeRoles, existing.representative_role) : existing.representative_role,
        payload.representative_phone !== undefined ? payload.representative_phone || null : existing.representative_phone,
        payload.contact_name !== undefined ? payload.contact_name || null : existing.contact_name,
        payload.contact_relationship !== undefined ? payload.contact_relationship || null : existing.contact_relationship,
        payload.contact_phone !== undefined ? payload.contact_phone : existing.contact_phone,
        payload.alternate_contact_phone !== undefined ? payload.alternate_contact_phone || null : existing.alternate_contact_phone,
        payload.location !== undefined ? payload.location || null : existing.location,
        payload.people_count !== undefined ? Math.max(Number(payload.people_count) || 1, 1) : existing.people_count,
        payload.status !== undefined ? normalize(payload.status, allowedStatuses, existing.status) : existing.status,
        payload.notes !== undefined ? payload.notes || null : existing.notes,
        id,
      ]
    );
    return this.findById(id);
  }

  static async delete(id) {
    return BaseModel.deleteById(this.tableName, id);
  }
}

module.exports = Beneficiary;
