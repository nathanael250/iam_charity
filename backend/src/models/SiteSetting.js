const { query } = require("../config/database");

const NOTIFICATION_SETTINGS_KEY = "notification_settings";

const DEFAULT_NOTIFICATION_SETTINGS = {
  recipient_email: "",
  triggers: {
    donations: true,
    volunteer_applications: false,
    contact_messages: false,
    newsletter_signups: false,
  },
};

const normalizeNotificationSettings = (payload = {}) => {
  const triggers = payload.triggers || {};

  return {
    recipient_email: String(payload.recipient_email || "").trim(),
    triggers: {
      donations: Boolean(triggers.donations),
      volunteer_applications: Boolean(triggers.volunteer_applications),
      contact_messages: Boolean(triggers.contact_messages),
      newsletter_signups: Boolean(triggers.newsletter_signups),
    },
  };
};

class SiteSetting {
  static async getNotificationSettings() {
    const rows = await query(
      `SELECT setting_value
       FROM site_settings
       WHERE setting_key = ?
       LIMIT 1`,
      [NOTIFICATION_SETTINGS_KEY]
    );

    if (!rows[0]?.setting_value) return DEFAULT_NOTIFICATION_SETTINGS;

    try {
      const storedSettings = JSON.parse(rows[0].setting_value);
      return normalizeNotificationSettings({
        ...DEFAULT_NOTIFICATION_SETTINGS,
        ...storedSettings,
        triggers: {
          ...DEFAULT_NOTIFICATION_SETTINGS.triggers,
          ...(storedSettings.triggers || {}),
        },
      });
    } catch {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
  }

  static async updateNotificationSettings(payload, adminId = null) {
    const settings = normalizeNotificationSettings({
      ...DEFAULT_NOTIFICATION_SETTINGS,
      ...payload,
      triggers: {
        ...DEFAULT_NOTIFICATION_SETTINGS.triggers,
        ...(payload.triggers || {}),
      },
    });

    await query(
      `INSERT INTO site_settings
        (setting_group, setting_key, setting_value, value_type, is_public, updated_by)
       VALUES ('notifications', ?, ?, 'json', FALSE, ?)
       ON DUPLICATE KEY UPDATE
        setting_value = VALUES(setting_value),
        value_type = VALUES(value_type),
        is_public = VALUES(is_public),
        updated_by = VALUES(updated_by)`,
      [NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings), adminId]
    );

    return settings;
  }
}

module.exports = SiteSetting;
