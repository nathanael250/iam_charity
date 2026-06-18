-- Adds support-case ownership to resource records.
-- Run this once on existing databases created before materials_used/expenses had project_id.
--
-- IMPORTANT:
-- 1. Add project_id as NULL first so existing rows do not fail immediately.
-- 2. After this runs, open the dashboard and edit old material/expense records to choose
--    the correct Support Case, or run UPDATE statements to map old rows in bulk.
-- 3. After every old row has project_id, you may change project_id to NOT NULL.

ALTER TABLE materials_used
    ADD COLUMN project_id INT NULL AFTER id;

ALTER TABLE materials_used
    ADD CONSTRAINT fk_materials_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE;

ALTER TABLE materials_used
    DROP FOREIGN KEY fk_materials_beneficiary;

ALTER TABLE materials_used
    MODIFY beneficiary_id INT NULL;

ALTER TABLE materials_used
    ADD CONSTRAINT fk_materials_beneficiary
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id)
    ON DELETE SET NULL;


ALTER TABLE expenses
    ADD COLUMN project_id INT NULL AFTER id;

ALTER TABLE expenses
    ADD CONSTRAINT fk_expenses_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE;

ALTER TABLE expenses
    DROP FOREIGN KEY fk_expenses_beneficiary;

ALTER TABLE expenses
    MODIFY beneficiary_id INT NULL;

ALTER TABLE expenses
    ADD CONSTRAINT fk_expenses_beneficiary
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id)
    ON DELETE SET NULL;


-- Optional after old rows are mapped:
-- UPDATE materials_used SET project_id = <support_case_id> WHERE project_id IS NULL;
-- UPDATE expenses SET project_id = <support_case_id> WHERE project_id IS NULL;
-- ALTER TABLE materials_used MODIFY project_id INT NOT NULL;
-- ALTER TABLE expenses MODIFY project_id INT NOT NULL;
