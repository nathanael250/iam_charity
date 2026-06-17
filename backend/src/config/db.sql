-- CREATE DATABASE IF NOT EXISTS charity_system;
-- USE charity_system;

-- -- =========================
-- -- ADMINS
-- -- =========================
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'admin',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- PROJECTS
-- =========================
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    full_description LONGTEXT,
    category ENUM('housing', 'daily_needs', 'education', 'health', 'emergency', 'other') DEFAULT 'housing',
    location VARCHAR(255),
    target_amount DECIMAL(12,2) DEFAULT 0.00,
    raised_amount DECIMAL(12,2) DEFAULT 0.00,
    main_image VARCHAR(500),
    status ENUM('draft', 'active', 'paused', 'completed') DEFAULT 'draft',
    start_date DATE,
    end_date DATE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_projects_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

-- =========================
-- PROJECT IMAGES
-- =========================
CREATE TABLE project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_images_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE
);

-- =========================
-- PROJECT UPDATES
-- =========================
CREATE TABLE project_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    before_image_url VARCHAR(500),
    after_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_updates_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE
);

-- =========================
-- DONATIONS
-- =========================
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NULL,
    donor_name VARCHAR(150),
    donor_email VARCHAR(150),
    donor_phone VARCHAR(50),
    amount DECIMAL(12,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    donation_type ENUM('money', 'materials', 'food', 'clothes', 'construction_materials', 'other') DEFAULT 'money',
    payment_method ENUM('momo', 'bank_transfer', 'card', 'cash', 'other') DEFAULT 'momo',
    payment_status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    transaction_reference VARCHAR(255),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_donations_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL
);

-- =========================
-- VOLUNTEERS
-- =========================
CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    skills TEXT,
    volunteer_type ENUM('construction', 'teaching', 'medical', 'food_distribution', 'community_work', 'administration', 'other') DEFAULT 'other',
    availability VARCHAR(255),
    message TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- CONTACT MESSAGES
-- =========================
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- NEWSLETTER SUBSCRIBERS
-- =========================
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



USE charity_system;

-- =====================================================
-- 1. IMPROVE ADMIN ACCOUNTS
-- =====================================================

ALTER TABLE admins
    MODIFY role ENUM(
        'super_admin',
        'admin',
        'case_manager',
        'donation_manager',
        'content_editor'
    ) DEFAULT 'admin',
    ADD COLUMN last_login_at DATETIME NULL AFTER status;


-- =====================================================
-- 2. IMPROVE SUPPORT CASES
-- Existing "projects" become the internal support cases.
-- =====================================================

ALTER TABLE projects
    ADD COLUMN beneficiary_name VARCHAR(200) NULL AFTER title,
    ADD COLUMN beneficiary_type ENUM(
        'individual',
        'family',
        'community',
        'organization'
    ) DEFAULT 'family' AFTER beneficiary_name,
    ADD COLUMN support_needed TEXT NULL AFTER full_description,
    ADD COLUMN urgency ENUM(
        'normal',
        'important',
        'urgent',
        'critical'
    ) DEFAULT 'normal' AFTER category,
    ADD COLUMN people_count INT UNSIGNED DEFAULT 1 AFTER location,
    ADD COLUMN currency VARCHAR(10) DEFAULT 'USD' AFTER people_count,
    ADD COLUMN is_featured BOOLEAN DEFAULT FALSE AFTER status,
    ADD COLUMN consent_confirmed BOOLEAN DEFAULT FALSE AFTER is_featured,
    ADD COLUMN published_at DATETIME NULL AFTER consent_confirmed,
    ADD COLUMN meta_title VARCHAR(255) NULL AFTER published_at,
    ADD COLUMN meta_description VARCHAR(500) NULL AFTER meta_title;

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_category ON projects(category);


-- =====================================================
-- 3. IMPROVE PROJECT/IMPACT UPDATES
-- =====================================================

ALTER TABLE project_updates
    ADD COLUMN support_summary TEXT NULL AFTER description,
    ADD COLUMN before_image_url VARCHAR(500) NULL AFTER image_url,
    ADD COLUMN after_image_url VARCHAR(500) NULL AFTER before_image_url,
    ADD COLUMN amount_delivered DECIMAL(12,2) DEFAULT 0.00
        AFTER support_summary,
    ADD COLUMN people_helped INT UNSIGNED DEFAULT 0
        AFTER amount_delivered,
    ADD COLUMN completion_date DATE NULL AFTER people_helped,
    ADD COLUMN status ENUM(
        'draft',
        'published',
        'archived'
    ) DEFAULT 'draft' AFTER completion_date,
    ADD COLUMN created_by INT NULL AFTER status,
    ADD COLUMN published_at DATETIME NULL AFTER created_by,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
    ADD CONSTRAINT fk_project_updates_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL;


-- =====================================================
-- 4. IMPROVE DONATIONS
-- =====================================================

ALTER TABLE donations
    ADD COLUMN phone_country_code VARCHAR(10) NULL
        AFTER donor_email,
    ADD COLUMN admin_notes TEXT NULL AFTER message,
    ADD COLUMN confirmed_by INT NULL AFTER admin_notes,
    ADD COLUMN confirmed_at DATETIME NULL AFTER confirmed_by,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
    ADD CONSTRAINT fk_donations_confirmed_admin
        FOREIGN KEY (confirmed_by) REFERENCES admins(id)
        ON DELETE SET NULL;

CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_project ON donations(project_id);
CREATE INDEX idx_donations_reference ON donations(transaction_reference);


-- =====================================================
-- 5. IMPROVE VOLUNTEERS
-- =====================================================

ALTER TABLE volunteers
    ADD COLUMN phone_country_code VARCHAR(10) DEFAULT '+250'
        AFTER email,
    ADD COLUMN image_url VARCHAR(500) NULL AFTER address,
    ADD COLUMN preferred_support_area VARCHAR(255) NULL
        AFTER volunteer_type,
    ADD COLUMN admin_notes TEXT NULL AFTER message,
    ADD COLUMN reviewed_by INT NULL AFTER status,
    ADD COLUMN reviewed_at DATETIME NULL AFTER reviewed_by,
    MODIFY status ENUM(
        'pending',
        'contacted',
        'approved',
        'rejected',
        'inactive'
    ) DEFAULT 'pending',
    ADD CONSTRAINT fk_volunteers_reviewed_admin
        FOREIGN KEY (reviewed_by) REFERENCES admins(id)
        ON DELETE SET NULL;

CREATE INDEX idx_volunteers_status ON volunteers(status);


-- =====================================================
-- 6. IMPROVE CONTACT MESSAGES
-- =====================================================

ALTER TABLE messages
    ADD COLUMN phone_country_code VARCHAR(10) DEFAULT '+250'
        AFTER email,
    ADD COLUMN assigned_to INT NULL AFTER status,
    ADD COLUMN replied_at DATETIME NULL AFTER assigned_to,
    MODIFY status ENUM(
        'unread',
        'read',
        'replied',
        'archived'
    ) DEFAULT 'unread',
    ADD CONSTRAINT fk_messages_assigned_admin
        FOREIGN KEY (assigned_to) REFERENCES admins(id)
        ON DELETE SET NULL;

CREATE INDEX idx_messages_status ON messages(status);


-- =====================================================
-- 7. MEDIA LIBRARY
-- Stores reusable CMS images and documents.
-- =====================================================

CREATE TABLE media_library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_url VARCHAR(500) NOT NULL,
    file_type ENUM(
        'image',
        'video',
        'document',
        'other'
    ) DEFAULT 'image',
    mime_type VARCHAR(100),
    file_size BIGINT UNSIGNED,
    alt_text VARCHAR(255),
    caption VARCHAR(500),
    uploaded_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_admin
        FOREIGN KEY (uploaded_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 8. CMS PAGES
-- One record for each editable public page.
-- =====================================================

CREATE TABLE cms_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    status ENUM(
        'draft',
        'published',
        'archived'
    ) DEFAULT 'draft',
    updated_by INT NULL,
    published_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_cms_pages_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

INSERT INTO cms_pages (page_key, title, slug, status)
VALUES
    ('home', 'Home', '/', 'published'),
    ('about', 'About Us', '/about', 'published'),
    ('people_to_support', 'People to Support', '/projects', 'published'),
    ('impact', 'Our Impact', '/impact-stories', 'published'),
    ('volunteer', 'Volunteer', '/volunteer', 'published'),
    ('contact', 'Contact', '/contact', 'published');


-- =====================================================
-- 9. CMS PAGE SECTIONS
-- content_json stores section-specific structured data.
-- =====================================================

CREATE TABLE cms_page_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    section_name VARCHAR(150) NOT NULL,
    heading VARCHAR(255),
    subheading VARCHAR(500),
    body_content LONGTEXT,
    content_json JSON NULL,
    background_image_id INT NULL,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status ENUM(
        'draft',
        'published'
    ) DEFAULT 'draft',
    updated_by INT NULL,
    published_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_page_section (page_id, section_key),

    CONSTRAINT fk_sections_page
        FOREIGN KEY (page_id) REFERENCES cms_pages(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sections_background
        FOREIGN KEY (background_image_id) REFERENCES media_library(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_sections_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 10. EDITABLE IMPACT STATISTICS
-- =====================================================

CREATE TABLE impact_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statistic_key VARCHAR(100) NOT NULL UNIQUE,
    label VARCHAR(150) NOT NULL,
    value VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_statistics_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

INSERT INTO impact_statistics
    (statistic_key, label, value, description, icon, display_order)
VALUES
    (
        'families_supported',
        'Families Supported',
        '0',
        'Families who have received support',
        'home',
        1
    ),
    (
        'completed_cases',
        'Completed Support Cases',
        '0',
        'Support cases successfully completed',
        'verified',
        2
    ),
    (
        'communities_reached',
        'Communities Reached',
        '0',
        'Communities reached across Rwanda',
        'groups',
        3
    ),
    (
        'volunteers',
        'Registered Volunteers',
        '0',
        'People registered to serve',
        'volunteer_activism',
        4
    );


-- =====================================================
-- 11. EDITABLE CORE VALUES
-- =====================================================

CREATE TABLE core_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_core_values_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 12. IMPACT GALLERY
-- =====================================================

CREATE TABLE gallery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NULL,
    project_update_id INT NULL,
    media_id INT NOT NULL,
    title VARCHAR(255),
    caption VARCHAR(500),
    event_date DATE NULL,
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM(
        'draft',
        'published',
        'archived'
    ) DEFAULT 'draft',
    created_by INT NULL,
    published_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_gallery_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_gallery_update
        FOREIGN KEY (project_update_id) REFERENCES project_updates(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_gallery_media
        FOREIGN KEY (media_id) REFERENCES media_library(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gallery_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 13. GENERAL WEBSITE SETTINGS
-- =====================================================

CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_group VARCHAR(100) DEFAULT 'general',
    setting_key VARCHAR(150) NOT NULL UNIQUE,
    setting_value LONGTEXT,
    value_type ENUM(
        'text',
        'number',
        'boolean',
        'json',
        'image'
    ) DEFAULT 'text',
    is_public BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_settings_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

INSERT INTO site_settings
    (setting_group, setting_key, setting_value, value_type)
VALUES
    ('organization', 'organization_name', 'I Am Group', 'text'),
    ('organization', 'organization_country', 'Rwanda', 'text'),
    ('contact', 'contact_email', '', 'text'),
    ('contact', 'contact_phone', '', 'text'),
    ('contact', 'whatsapp_number', '', 'text'),
    ('contact', 'address', '', 'text'),
    ('donation', 'default_currency', 'USD', 'text'),
    ('footer', 'footer_message',
     'Together, we serve vulnerable people through practical support.',
     'text');


-- =====================================================
-- 14. SOCIAL MEDIA LINKS
-- =====================================================

CREATE TABLE social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_social_links_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 15. EDITABLE NAVIGATION LINKS
-- =====================================================

CREATE TABLE navigation_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    location ENUM(
        'header',
        'footer_quick_links',
        'footer_support',
        'footer_resources',
        'footer_legal'
    ) DEFAULT 'header',
    display_order INT DEFAULT 0,
    opens_new_tab BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_navigation_admin
        FOREIGN KEY (updated_by) REFERENCES admins(id)
        ON DELETE SET NULL
);


-- =====================================================
-- 16. CMS CONTENT REVISION HISTORY
-- =====================================================

CREATE TABLE content_revisions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_type ENUM(
        'page',
        'section',
        'setting',
        'statistic',
        'core_value',
        'gallery'
    ) NOT NULL,
    content_id INT NOT NULL,
    revision_data JSON NOT NULL,
    revision_note VARCHAR(500),
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_revisions_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL,

    INDEX idx_revision_content (content_type, content_id)
);


-- =====================================================
-- 17. ADMIN AUDIT LOG
-- =====================================================

CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id INT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_admin
        FOREIGN KEY (admin_id) REFERENCES admins(id)
        ON DELETE SET NULL,

    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_admin (admin_id),
    INDEX idx_audit_date (created_at)
);
