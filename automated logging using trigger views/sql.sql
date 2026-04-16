-- 1. Create & Select Database
CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

-- 2. Drop old objects (to avoid errors)
DROP TRIGGER IF EXISTS after_insert_employee;
DROP TRIGGER IF EXISTS after_update_employee;
DROP VIEW IF EXISTS daily_activity;
DROP TABLE IF EXISTS employee_log;
DROP TABLE IF EXISTS employees;

-- 3. Create Main Table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);

-- 4. Create Log Table
CREATE TABLE employee_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT,
    action_type VARCHAR(10),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Triggers
DELIMITER $$

CREATE TRIGGER after_insert_employee
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employee_log(emp_id, action_type)
    VALUES (NEW.emp_id, 'INSERT');
END$$

CREATE TRIGGER after_update_employee
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employee_log(emp_id, action_type)
    VALUES (NEW.emp_id, 'UPDATE');
END$$

DELIMITER ;

-- 6. Create View
CREATE VIEW daily_activity AS
SELECT 
    DATE(action_time) AS activity_date,
    action_type,
    COUNT(*) AS total_actions
FROM employee_log
GROUP BY DATE(action_time), action_type;

-- 7. Test Data
INSERT INTO employees VALUES (1, 'Vivek', 20000);
INSERT INTO employees VALUES (2, 'Rahul', 25000);

UPDATE employees SET salary = 30000 WHERE emp_id = 1;

-- 8. Check Output
SELECT * FROM employee_log;
SELECT * FROM daily_activity;