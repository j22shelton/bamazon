// nmp dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

//  MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Swordfish7&',
	database: 'Bamazon'
});

// Ensure only positive numbers added
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// prompts customer for purchase details
function promptUserPurchase() {
	
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'What item number would you like to buy?',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;
                
				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Quantity Available!');

					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
				
					// Update the quantities
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Total $' + productData.price * quantity);
						console.log("\n---------------------------------------------------------------------\n");

						//stop the db connection
						connection.end();
					})
				} else {
					console.log('Insufficient Quantity');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

// retrieve the inventory from database 
function displayInventory() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';
            strOut += 'Quantity Available: ' + data[i].stock_quantity + '\n';
			console.log(strOut);
		}

	  	console.log("-----------------------------------\n");

	  	// prompts customer for purchase details
	  	promptUserPurchase();
	})
}

// Run the application logic
function runBamazon() {

	displayInventory();
}

runBamazon();