CREATE DATABASE IF NOT EXISTS charity_system;
USE charity_system;

-- =========================
-- ADMINS
-- =========================
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
    currency VARCHAR(10) DEFAULT 'RWF',
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