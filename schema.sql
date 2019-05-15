create database bamazon;

use bamazon;

CREATE TABLE products (
    item_id INTEGER(15) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(15) NOT NULL,
    department_name VARCHAR(15) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER(15) NOT NULL,
    PRIMARY KEY (item_id)
);
    
    Select * from products;
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Bike", "Sports", 250, 45),
    ("Scooter", "Sports", 350, 97),
    ("Skates", "Sports", 50, 105),
    ("Unicycle", "Sports", 150, 20),
    ("Bat","Sports", 30, 300),
    ("Treadmill", "Sports", 500, 25),
    ("Eliptical", "Sports", 550, 25),
    ("Stairclimber", "Sports", 525, 25),
    ("Basketball", "Sports", 25, 103),
    ("Baseball", "Sports", 15, 145);