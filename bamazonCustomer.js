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

// Ensure only whole numbers added
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Only enter whole numbers.';
	}
}

// prompts customer for purchase details
function customerInput() {
	
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
				var productData = data[0];
				if (quantity <= productData.stock_quantity) {
					console.log('Quantity Available!');

					var quantityChange = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
				
					// Update the quantities
					connection.query(quantityChange, function(err, data) {
						if (err) throw err;

						console.log('Total $' + productData.price * quantity);
						console.log('Thank you, come again!')
						console.log("\n---------------------------------------------------------------------\n");

						//stop the db connection
						connection.end();
					})
				} else {
					console.log('Insufficient Quantity, cannot proceed wih order');
					console.log("\n---------------------------------------------------------------------\n");

					currentSportsProducts();
				}
			}
		)
	})
}

// retrieve the inventory from database 
function currentSportsProducts() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var display = '';
		for (var i = 0; i < data.length; i++) {
			display = '';
			display += 'Item ID: ' + data[i].item_id + '  //  ';
			display += 'Product Name: ' + data[i].product_name + '  //  ';
			display += 'Department: ' + data[i].department_name + '  //  ';
			display += 'Price: $' + data[i].price + '\n';
            display += 'Quantity Available: ' + data[i].stock_quantity + '\n';
			console.log(display);
		}

	  	console.log("-----------------------------------\n");

	  	// prompts customer for purchase details
	  	customerInput();
	})
}

// Run the application logic
function runBamazon() {

	currentSportsProducts();
}

runBamazon();