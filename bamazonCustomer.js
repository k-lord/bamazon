var figlet = require("figlet");
var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log("connected as id " + connection.threadId + "\n");
    storeInit();
});

function storeInit() {
    figlet("BAMAZON", function(err, data) {
        if (err) {
            console.log("Oops! Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data)
    });
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        console.table(results);

    })};