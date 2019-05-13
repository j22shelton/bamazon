var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Swordfish7&",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
start();
});

function inventory() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [15, 15, 15, 5, 15]
    });

    listInventory();

    function listInventory() {

        // query the database

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log("");
            console.log("");
            console.log("");
            console.log(table.toString());
            console.log("");
            continuePrompt();
        });
    }
}

//Prompts for product ID and quantity//

function idPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "item_Id",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "stock_Quantity",
            message: "How many units of this item would you like to purchase?",
        }
    ]).then(function(userPurchase) {

        //connect to database to find stock_quantity in database & check if store has enough product available//

        connection.query("SELECT * FROM products", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("Insufficient Quantity!");
                   
                    startPrompt();

                } else {

                    //list item information for user for confirm prompt
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.stock_quantity);
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                  

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    
                    //console.log(newStock);
                    confirmPrompt(newStock);
                }
            }
        });
    });
}

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock

            }], function(err, res) {});
