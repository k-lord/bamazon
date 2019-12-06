var figlet = require("figlet");
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root420",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\nconnected as id " + connection.threadId + "\n");
    connection.end();
});