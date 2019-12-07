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
    console.log(colors.yellow("\nLogged in as Bamazon Manager.\n"));
    managerInit();
});

function managerInit() {
    inquirer
        .prompt({
            name: "managerInit",
            type: "list",
            message: "What would you like to do today?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        })
        .then(function (answer) {
            if (answer.managerInit === "View Products for Sale") {
                productList();
            } else if (answer.managerInit === "View Low Inventory") {
                lowInventory();
            } else if (answer.managerInit === "Add to Inventory") {
                addInventory();
            } else if (answer.managerInit === "Add New Product") {
                addNewProduct();
            } else {
                console.log(colors.yellow("\nLogging out of Manager session.\n"));
                connection.end();
            };
        });
};

function productList() {
    connection.query("SELECT * FROM products",
        function (err, results) {
            if (err) throw err;
            console.log("\n");
            console.table(results);
            managerInit();
        });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 10",
        function (err, results) {
            //if (err) throw err;
            console.log("\n");
            console.table(results);
            managerInit();
        });
};

function addInventory() {
    connection.query("SELECT * FROM products",
        function (err, results) {
            if (err) throw err;
            console.log("\n");
            console.table(results);

            inquirer
                .prompt([
                    {
                        name: "inventoryAdd",
                        type: "input",
                        message: "What is the ID number for the item for which you would like to add Inventory?"
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "How much Inventory are you adding?"
                    }
                ])
                .then(function (answer) {
                    // get the information of the chosen item
                    var chosenID = parseInt(answer.inventoryAdd);
                    var x = chosenID - 1;
                    var inventoryQuantity = parseInt(answer.quantity) + results[x].stock_quantity;

                    //console.log("\ninventory quantity is going to be " + inventoryQuantity);

                    connection.query("UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: inventoryQuantity
                        },
                        {
                            id: chosenID
                        }],
                        function (err, results) {
                            //if (err) throw err;
                            console.log(colors.green.bold("\nID # " + chosenID + " now has an updated inventory count of " + inventoryQuantity + "."));
                            productList();
                        });
                });
        });
};

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "What is the item you would like to add to the Bamazon store?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to place this item in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of this item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "What is the stock count for this item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price || 0,
                    stock_quantity: answer.stock_quantity || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log(colors.green.bold("\nYour item was created successfully!"));
                    productList();
                }
            );
        });

}
/*
* List a set of menu options:

    * View Products for Sale

    * View Low Inventory

    * Add to Inventory

    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -
*/