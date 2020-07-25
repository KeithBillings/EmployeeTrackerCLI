const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require('inquirer')

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerdb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAll();
});

function showResults (results) {
  console.table(results);
}; 

function showAll () {connection.query(
  `SELECT 	
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
  );`, 
function (err, res) {
  if (err) throw err; 
  showResults(res); 
})};

function addDepartment (name){
  connection.query(
    `INSERT INTO department (department)
    VALUES ("${name}");`,
    function (err, res){
      if (err) throw err;
      console.log (`Added a department named: ${name}!`)
      showResults(res);
    }
  )
};

function removeDepartment (name){
  connection.query(
    `DELETE FROM department WHERE department = "${name}"`,
    function (err, res){
      if (err) throw err;
      console.log (`Removed the department named: ${name}.`)
      showResults(res);
    }
  )
};

function listDepartments () {
  connection.query(
    `SELECT * FROM employee_trackerdb.department;`,
    function (err, res){
      if (err) throw err;
      showResults(res);
    }
  )
};

