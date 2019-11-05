# Bamazon

Technology Used:

This app is an Amazon style storefront created with MySQL, Node.js, and javascript.


How it works:

The app takes in orders from customers who view the inventory, then choose the item, and also the quantity of the product they wish to purchase. 

Afterwards, the app depletes inventory by the amount of the customer's purchase.

The app also knows if there is insufficient inventory and prevents the transaction from occuring in this case.


Clone: https://github.com/j22shelton/bamazon.git

Note: In order to run this application, you should have the MySQL database already set up on your machine. Also run "npm install" in the terminal prior to using this application.

Contributer: Jocelyn Shelton

The images included reflect the Customer-side application in action:

### Picture 1: Insufficient Quantity, order cannot proceed
### Picture 2: Inventory is sufficient and Order Total is calculated
### Picture 3: Inventory Depleted (from the previous transaction shown in picture 2), and remaining inventory is listed

![](/images/InsufficientQuantity.png?raw=true)
<br><br>
![](/images/QuantityAdded.png?raw=true)
<br><br>
![](/images/depletedInventory.png?raw=true)
<br><br>
