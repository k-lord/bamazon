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
    //console.log("connected as id " + connection.threadId + "\n");
    storeName();
    storeInit();
});

function storeName() {
    console.log(figlet.textSync('BAMAZON', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
};

function storeInit() {
    inquirer
        .prompt({
            name: "customerInit",
            type: "list",
            message: "What would you like to do today?",
            choices: ["SHOP", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.customerInit === "SHOP") {
                customerShop();
            } else {
                console.log("\nThanks for shopping at Bamazon. Visit us again soon!\n");
                connection.end();
            }
        });
};

function customerShop() {
    //console.log("You're shopping!");
    //connection.end();

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n");
        console.table(results);

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "What is the ID number for the item you would like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenID = answer.choice;
                var quantity = answer.quantity;
                //console.log("You've chosen to purchase ID # " + chosenID);
                //console.log(results);
                //storeInit();
                var x = chosenID - 1;
                console.log("\n" + results[x].product_name + " (Quantity: " + quantity + ") has been added to your shopping cart.\n");
                storeInit();
            })

    });


}
