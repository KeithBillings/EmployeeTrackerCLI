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
  password: "gamespot21",
  database: "employee_trackerdb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAll();
});

function showResults(results) {
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
      showResults(res);
    })
};

function addDepartment(name) {
  connection.query(
    `INSERT INTO department (department)
    VALUES ("${name}");`,
    function (err, res) {
      if (err) throw err;
      console.log(`Added a department named: ${name}!`)
      showResults(res);
    }
  )
};

function removeDepartment(name) {
  connection.query(
    `DELETE FROM department WHERE department = "${name}"`,
    function (err, res) {
      if (err) throw err;
      console.log(`Removed the department named: ${name}.`)
      showResults(res);
    }
  )
};

function listDepartments() {
  connection.query(
    `SELECT * FROM employee_trackerdb.department;`,
    function (err, res) {
      if (err) throw err;
      showResults(res);
    }
  )
};

let continueQuestions = true;

const askQuestions = async () => {
  const questions = [
    {
      type: 'list',
      name: 'directory',
      choices: [
        "See All",
        "Add a department",
        "Remove a department",
        "List all departments",
        "No more questions"
      ],
      message: "What do you want to do?"
    },
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department you want to add?',
      when: function (answers) {
        return answers.directory === 'Add a department'
      }
    },
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department you want to remove?',
      when: function (answers) {
        return answers.directory === 'Remove a department'
      }
    }
  ];

  const { ...answers } = await inquirer.prompt(questions);
  if (answers.directory === "No More questions") {
    continueQuestions = false
  };
  if (answers.directory === 'See All') {
    showAll();
  };
  if (answers.directory === 'Add a department') {
    addDepartment(answers.departmentName);
    showAll();
  };
  if (answers.directory === 'Remove a department') {
    removeDepartment(answers.departmentName);
    showAll();
  };
  if (answers.directory === 'List all departments') {
    listDepartments();
  };

  return continueQuestions ? askQuestions() : console.log("Done!");
}

askQuestions();