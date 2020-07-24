-- Departments
INSERT INTO department (department)
VALUES ("Sales");
INSERT INTO department (department)
VALUES ("Finance");
INSERT INTO department (department)
VALUES ("Engineering");

-- Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Sales", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 55000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Accountant", 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 45000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ricky", "Bobby", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shake", "Bake", 2, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dollar", "Bill", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martin", "Chang", 4, 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Keith", "Billings", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Jobs", 6, 3);

-- Managers
INSERT INTO managers (manager)
VALUES ("Ricky Bobby");
INSERT INTO managers (manager)
VALUES ("Dollar Bill");
INSERT INTO managers (manager)
VALUES ("Keith Billings");
