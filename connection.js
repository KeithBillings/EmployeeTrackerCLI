let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "gamespot21",
  database: "Employee Tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


let data = connection.query("SELECT * FROM employees", function(err, res){
  if(err) throw err;
  console.log('Table contains: ', res);
});

console.log(data.RowDataPacket);