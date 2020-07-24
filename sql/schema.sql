DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL, 
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT
);

CREATE TABLE managers (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
manager VARCHAR (30)
);

SELECT 	
  employee.id,
  employee.first_name,
  employee.last_name,
  role.title,
  department.department,
  managers.manager,
  role.salary        
FROM employee 
LEFT OUTER JOIN role ON (
	employee.role_id = role.id    
)
LEFT OUTER JOIN department ON (
	department.id = role.department_id
)
LEFT OUTER JOIN managers ON (
	employee.manager_id = managers.id
);