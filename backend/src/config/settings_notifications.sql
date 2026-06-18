CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_group VARCHAR(100) DEFAULT 'general',
    setting_key VARCHAR(150) NOT NULL UNIQUE,
    setting_value LONGTEXT,
    value_type ENUM('text', 'number', 'boolean', 'json', 'image') DEFAULT 'text',
    is_public BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_settings_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

INSERT INTO site_settings
    (setting_group, setting_key, setting_value, value_type, is_public)
VALUES
    (
        'notifications',
        'notification_settings',
        '{"recipient_email":"","triggers":{"donations":true,"volunteer_applications":false,"contact_messages":false,"newsletter_signups":false}}',
        'json',
        FALSE
    )
ON DUPLICATE KEY UPDATE
    setting_value = setting_value;
