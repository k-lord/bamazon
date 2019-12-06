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
    //console.log("connected as id " + connection.threadId + "\n");
    storeName();
    storeInit();
});

function storeName() {
    console.log(colors.rainbow(figlet.textSync('BAMAZON', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
};

function storeInit() {
    inquirer
        .prompt({
            name: "customerInit",
            type: "list",
            message: "What would you like to do today?",
            choices: ["SHOP ALL", "EXIT"]
        })
        .then(function (answer) {
            if (answer.customerInit === "SHOP ALL") {
                customerShop();
            } else {
                console.log(colors.rainbow("\nThanks for shopping at Bamazon. Visit us again soon!\n"));
                connection.end();
            }
        });
};

function customerShop() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (err, results) {
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
                var chosenID = parseInt(answer.choice);
                var quantity = parseInt(answer.quantity);
                var x = chosenID - 1;
                var purchase = results[x].product_name + " (Quantity: " + quantity + ")"
                var total = quantity * results[x].price;
                var newStock = results[x].stock_quantity - quantity;

                console.log(colors.blue("\n" + purchase + " has been added to your shopping cart. Your subtotal is $" + total + "."));

                console.log("\nCompleting your order...");

                //Checking to see if Inventory is available for purchase
                if (results[x].stock_quantity > quantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                id: chosenID
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            //console.log("\n" + results[x].product_name + " on hand stock count is now " + newStock + ".");
                            console.log(colors.green.bold("\nWe've completed your order for " + purchase + " for $" + total + ". Thanks for shopping at Bamazon!\n"));
                            storeName();
                            storeInit();
                        }
                    );

                } else {
                    console.log(colors.red.bold("\nUnfortunately " + purchase + " is either out of stock or we don't have enough inventory to complete this order.\n"));
                    storeName();
                    storeInit();
                }
            })
    });
};



