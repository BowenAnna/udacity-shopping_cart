/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
let products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

//created an array of object literals that consists of name, price, quantity, productId and image
products = [
  {
    name: "Cherries",
    price: 4,
    quantity: 0,
    productId: 100,
    image: "../images/cherry.jpg",
  },
  {
    name: "Strawberries",
    price: 5,
    quantity: 0,
    productId: 101,
    image: "../images/strawberry.jpg",
  },
  {
    name: "Oranges",
    price: 10,
    quantity: 0,
    productId: 102,
    image: "../images/orange.jpg",
  },
];

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

//created a reusable helper function to get a product by it's id from any list
function getProductByIdFromList(productId, productList){
  return productList.find(product=>product.productId === productId)
}

//function to add a product to the cart based on it's id
function addProductToCart(productId) {
  let product = getProductByIdFromList(productId, products) //got the product from the products array
  if (product) { //checked if that products exists
    let existingItem = cart.find((item) => item.productId === productId); //checked if the product is already in the cart
    if (existingItem) {
      existingItem.quantity += 1; //increased product's quantity in cart by 1
    } else {
      cart.push({ ...product, quantity: 1 }); //addded product to the cart with quantity set to 1
    }
    product.quantity += 1; //increased the original product's quantity 
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

//function to increase the quantity of a specific product in the cart
function increaseQuantity(productId) {
  let product = getProductByIdFromList(productId, products) //got the original product
  let cartItem = getProductByIdFromList(productId, cart) //got the item from the cart
  if (product && cartItem) { //checked if both exist
    product.quantity += 1; // increased original product's quantity
    cartItem.quantity += 1; // increased cart item's quantity
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

// Function to decrease the quantity of a specific product in the cart
function decreaseQuantity(productId) {
  let product = getProductByIdFromList(productId, products) // got the original product 
  let cartItem = getProductByIdFromList(productId, cart) // got the item from cart
  
  if (cartItem && product) { //checked if both exist
    cartItem.quantity -= 1; //decreased cart item's quantity
    product.quantity -= 1; //decreased original product's quantity
    
    if (cartItem.quantity === 0) { //if quantity reaches zero, item gets removed from the cart
      removeProductFromCart(productId);
    }
  }
}


/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

// Function to remove a specific product from the cart and reset its quantity in products list
function removeProductFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId); //found index in cart array
  if (index !== -1) {
    cart.splice(index, 1); //removed item from cart using splice
    let product = getProductByIdFromList(productId, products) //got the product from the products array
        if (product) {
          product.quantity = 0; //reset it's quantity to 0
        }
  }
}


/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

// Function to calculate and return total cost of all products in the cart
let totalPaid = 0;

function cartTotal() {
  let total = 0;
   // iterated through each item in the cart and calculate total cost based on price and quantity 
  cart.forEach((item) => (total += item.quantity * item.price));
  return total;
    // return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/* Create a function called emptyCart that empties the products from the cart */

// function emptyCart() {
//   // cart.length=0;
//   cart.splice(0, cart.length);
//   return cart;
// }

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

// function pay(amount) {
//   totalPaid+=amount;
//   const total = cartTotal();
//   return totalPaid - total;
// }

// Function to handle payment process 
function pay(amount) {
  totalPaid+=amount;  //added the payment amount to the total paid
  let remaining = totalPaid - cartTotal(); //calculated the remaining balance by subtracting the cart total from the total paid
  if(remaining>=0){ // checked if the remaining balance is non-negative
    totalPaid =0; // reset the total paid to 0
    emptyCart(); //empty the cart
  }
  return remaining; //returning the remaining balance: positive if paid in full and chance is needed and negative if payment isn't enough
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

// Function to empty all items from the cart and reset their quantities in products list 
function emptyCart() {
  // cart.length=0;
   // cleared all items from the cart array using splice method 
  cart.splice(0, cart.length);
  return cart;
}

//I was able to only convert from USD to other currencies, because currency function takes only one argument.
function currency(curr){
if (curr ==='EUR'){ //checked if currency is in EUR
  products.forEach(item=>item.price=(item.price*0.9).toFixed(2)) //converted price to EUR
}
else if (curr === 'YEN'){//checked if currency is in YEN
  products.forEach(item=>item.price=(item.price*143.69).toFixed(2)) //converted price to YEN
}
else {
  products.forEach(item=>item.price=(item.price*1).toFixed(2)) //kept the price the same for USD
}
}


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  currency
};
