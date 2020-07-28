const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require('inquirer');

let continueQuestions = true;

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "", // Change this to your MySQL pw
  database: "employee_trackerdb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAll();
});

function tableResults(results) {
  console.log(`\n`);
  console.table(results);
};

function showAll() {
  connection.query(
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
      tableResults(res);
    })
};

// Adding functions
function addDepartment(name) {
  connection.query(
    `INSERT INTO department (department)
    VALUES ("${name}");`,
    function (err, res) {
      if (err) throw err;
      console.log(`Added a department named: ${name}!`)
      listDepartments();
    }
  )
};
function addRole (title, salary, department_id) {
  connection.query(
    `INSERT INTO role (title, salary, department_id)
    VALUES ("${title}", ${salary}, ${department_id});`,
    function (err, res){
      if (err) throw err;
      console.log(`Added a role titled: ${title}, with a salary of ${salary}.`)
      listRoles();
    }
  )
}

// Removing functions
function removeDepartment(name) {
  connection.query(
    `DELETE FROM department WHERE department = "${name}"`,
    function (err, res) {
      if (err) throw err;
      console.log(`Removed the department named: ${name}.`)
      listDepartments(res);
    }
  )
};
function removeRole(title) {
  connection.query(
    `DELETE FROM role WHERE title = "${title}"`,
    function (err, res) {
      if (err) throw err;
      console.log(`Removed the department titled: ${title}.`)
      listDepartments(res);
    }
  )
};

// Listing functions
function listDepartments() {
  connection.query(
    `SELECT * FROM employee_trackerdb.department;`,
    function (err, res) {
      if (err) throw err;
      tableResults(res);
    }
  )
};
function listRoles() {
  connection.query(
    `SELECT * FROM employee_trackerdb.role;`,
    function (err, res) {
      if (err) throw err;
      tableResults(res);
    }
  )
};
function listEmployees() {
  connection.query(
    `SELECT * FROM employee_trackerdb.employee;`,
    function (err, res) {
      if (err) throw err;
      tableResults(res);
    }
  )
};

// --------- Questions ------------- //
const askQuestions = async () => {
  const questions = [
    {
      type: 'list',
      name: 'directory',
      choices: [
        "See All Results",
        "Departments",
        "Roles",
        "Employees"
      ],
      message: "Select a category?"
    },
    {
      type: 'list',
      name: 'departmentDir',
      choices: [
        "Add a department",
        "Remove a department",
        "List all departments"
      ],
      message: 'Select a choice: ',
      when: function (answers) {
        return answers.directory === "Departments"
      }
    },
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department you want to add?',
      when: function (answers) {
        return answers.departmentDir === 'Add a department'
      }
    },
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department you want to remove?',
      when: function (answers) {
        return answers.departmentDir === 'Remove a department'
      }
    },
    {
      type: 'list',
      name: 'rolesDir',
      choices: [
        "Add a role",
        "Remove a role",
        "List all roles"
      ],
      message: 'Select a choice: ',
      when: function (answers) {
        return answers.directory === "Roles"
      }
    },
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the title of this role you want to add?',
      when: function(answers){
        return answers.roleDir === 'Add a role'
      }
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary of the role you are adding?',
      when: function (answers){
        return answers.roleDir === 'Add a role'
      }
    },
    {
      type: 'number',
      name: 'roleDepartment_id',
      message: 'What is the department id number that this role will be assigned to?',
      when: function(answers){
        return answers.roleDir === 'Add a role'
      }
    },
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the title of the role you want to delete?',
      when: function (answers){
        return answers.roleDir === 'Remove a role'
      }
    },
    {
      type: 'list',
      name: 'employeeDir',
      choices: [
        "Add an employee",
        "Remove an employee",
        "List all employees"
      ],
      message: 'Select a choice: ',
      when: function (answers) {
        return answers.directory === 'Employees'
      }      
    }
  ];
  
  // Asking questions
  const { ...answers } = await inquirer.prompt(questions);

  // Parsing results and acting upon them
  if (answers.directory === 'See All Results') {
    showAll();
  }
  else if (answers.departmentDir === 'Add a department') {
    addDepartment(answers.departmentName);
  }
  else if (answers.departmentDir === 'Remove a department') {
    removeDepartment(answers.departmentName);
  }
  else if (answers.departmentDir === 'List all departments') {
    listDepartments();
  }
  else if (answers.rolesDir === 'Add a role'){
    addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment_id);
  }
  else if (answers.rolesDir === 'Remove a role'){
    removeRole(answers.roleTitle);
  }
  else if (answers.rolesDir === 'List all roles'){
    listRoles();
  }
  else if (answers.rolesDir === 'Add an employee'){
    addEmployee();
  }
  else if (answers.rolesDir === 'Remove an employee'){
    removeEmployee();
  }
  else if (answers.rolesDir === 'List all employees'){
    listEmployees();
  }

  // Looping questions
  return continueQuestions ? askQuestions() : console.log("Done!");
}

askQuestions();