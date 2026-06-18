

-- =========================
-- BENEFICIARIES
-- =========================
CREATE TABLE IF NOT EXISTS beneficiaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_code VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(200) NOT NULL,
    beneficiary_type ENUM('individual', 'family') DEFAULT 'family',

    -- For individuals, store the person's identifier here.
    -- For families, store the family representative/leader identifier here.
    identifier_type ENUM(
        'national_id',
        'passport',
        'refugee_id',
        'village_id',
        'phone',
        'none',
        'other'
    ) DEFAULT 'none',
    identifier_value VARCHAR(120),

    representative_name VARCHAR(200),
    representative_role ENUM(
        'self',
        'family_leader',
        'parent',
        'guardian',
        'other'
    ) DEFAULT 'self',
    representative_phone VARCHAR(50),

    contact_name VARCHAR(200),
    contact_relationship VARCHAR(100),
    contact_phone VARCHAR(50) NOT NULL,
    alternate_contact_phone VARCHAR(50),

    location VARCHAR(255),
    people_count INT UNSIGNED DEFAULT 1,
    status ENUM('active', 'completed', 'inactive') DEFAULT 'active',
    notes TEXT,
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_beneficiaries_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

-- CREATE INDEX idx_beneficiaries_code ON beneficiaries(beneficiary_code);
-- CREATE INDEX idx_beneficiaries_status ON beneficiaries(status);
-- CREATE INDEX idx_beneficiaries_type ON beneficiaries(beneficiary_type);
-- CREATE INDEX idx_beneficiaries_identifier ON beneficiaries(identifier_type, identifier_value);
-- CREATE INDEX idx_beneficiaries_contact_phone ON beneficiaries(contact_phone);


-- =========================
-- MATERIAL UNITS
-- =========================
CREATE TABLE IF NOT EXISTS  material_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_name VARCHAR(80) NOT NULL UNIQUE,
    unit_code VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO material_units (unit_name, unit_code, description)
VALUES
    ('Piece', 'piece', 'Single item or countable unit'),
    ('Kilogram', 'kg', 'Weight measured in kilograms'),
    ('Gram', 'g', 'Weight measured in grams'),
    ('Liter', 'l', 'Volume measured in liters'),
    ('Bag', 'bag', 'Bag or sack'),
    ('Box', 'box', 'Box or carton'),
    ('Bundle', 'bundle', 'Grouped bundle of items'),
    ('Pair', 'pair', 'Two matching items'),
    ('Meter', 'm', 'Length measured in meters')
ON DUPLICATE KEY UPDATE
    unit_name = VALUES(unit_name),
    description = VALUES(description),
    is_active = TRUE;


-- =========================
-- MATERIALS USED
-- =========================
CREATE TABLE IF NOT EXISTS materials_used (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    beneficiary_id INT NULL,
    material_name VARCHAR(200) NOT NULL,
    category ENUM(
        'food',
        'education',
        'housing',
        'health',
        'clothing',
        'hygiene',
        'construction',
        'other'
    ) DEFAULT 'other',
    quantity DECIMAL(12,2) NOT NULL DEFAULT 0,
    unit_id INT NOT NULL,
    unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_cost DECIMAL(12,2)
        GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    currency VARCHAR(10) DEFAULT 'USD',
    date_used DATE NOT NULL,
    notes TEXT,
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_materials_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_materials_beneficiary
        FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_materials_unit
        FOREIGN KEY (unit_id) REFERENCES material_units(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_materials_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

-- CREATE INDEX idx_materials_project ON materials_used(project_id);
-- CREATE INDEX idx_materials_beneficiary ON materials_used(beneficiary_id);
-- CREATE INDEX idx_materials_category ON materials_used(category);
-- CREATE INDEX idx_materials_unit ON materials_used(unit_id);
-- CREATE INDEX idx_materials_date ON materials_used(date_used);


-- =========================
-- EXPENSE CATEGORIES
-- =========================
CREATE TABLE IF NOT EXISTS expense_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO expense_categories (category_name, category_code, description)
VALUES
    ('Transport', 'transport', 'Transport costs for support delivery or visits'),
    ('Communication', 'communication', 'Phone, internet, SMS, or communication costs'),
    ('Labor', 'labor', 'Labor or worker payments'),
    ('Service Fee', 'service_fee', 'Service charges and processing fees'),
    ('Medical Service', 'medical_service', 'Medical consultation or treatment service costs'),
    ('School Fee', 'school_fee', 'School fees or education service costs'),
    ('Rent', 'rent', 'Rent or temporary housing costs'),
    ('Utilities', 'utilities', 'Water, electricity, or similar utility costs'),
    ('Administration', 'administration', 'Administrative support costs'),
    ('Other', 'other', 'Other expense category')
ON DUPLICATE KEY UPDATE
    category_name = VALUES(category_name),
    description = VALUES(description),
    is_active = TRUE;


-- =========================
-- EXPENSES
-- =========================
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    beneficiary_id INT NULL,
    expense_category_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    expense_date DATE NOT NULL,
    paid_to VARCHAR(200),
    payment_method ENUM('cash', 'mobile_money', 'bank_transfer', 'card', 'other') DEFAULT 'cash',
    reference VARCHAR(255),
    notes TEXT,
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_expenses_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_expenses_beneficiary
        FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_expenses_category
        FOREIGN KEY (expense_category_id) REFERENCES expense_categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_expenses_admin
        FOREIGN KEY (created_by) REFERENCES admins(id)
        ON DELETE SET NULL
);

-- CREATE INDEX idx_expenses_project ON expenses(project_id);
-- CREATE INDEX idx_expenses_beneficiary ON expenses(beneficiary_id);
-- CREATE INDEX idx_expenses_category ON expenses(expense_category_id);
-- CREATE INDEX idx_expenses_date ON expenses(expense_date);


-- =========================
-- EXISTING DATABASE MIGRATION NOTES
-- =========================
-- If these tables already existed with beneficiary_id as NOT NULL, update them manually before using
-- the new frontend forms:
--
-- ALTER TABLE materials_used ADD COLUMN project_id INT NULL AFTER id;
-- ALTER TABLE materials_used MODIFY beneficiary_id INT NULL;
-- UPDATE materials_used SET project_id = <support_case_id> WHERE project_id IS NULL;
-- ALTER TABLE materials_used MODIFY project_id INT NOT NULL;
-- ALTER TABLE materials_used ADD CONSTRAINT fk_materials_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
--
-- ALTER TABLE expenses ADD COLUMN project_id INT NULL AFTER id;
-- ALTER TABLE expenses MODIFY beneficiary_id INT NULL;
-- UPDATE expenses SET project_id = <support_case_id> WHERE project_id IS NULL;
-- ALTER TABLE expenses MODIFY project_id INT NOT NULL;
-- ALTER TABLE expenses ADD CONSTRAINT fk_expenses_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


-- =========================
-- USEFUL TOTAL QUERIES
-- =========================

-- Total materials cost
SELECT COALESCE(SUM(total_cost), 0) AS materials_cost
FROM materials_used;

-- Total expenses cost
SELECT COALESCE(SUM(amount), 0) AS expenses_cost
FROM expenses;

-- Total money used
SELECT
    (
        SELECT COALESCE(SUM(total_cost), 0)
        FROM materials_used
    )
    +
    (
        SELECT COALESCE(SUM(amount), 0)
        FROM expenses
    ) AS total_money_used;

-- Total people helped
SELECT COALESCE(SUM(people_count), 0) AS people_helped
FROM beneficiaries
WHERE status IN ('active', 'completed');
