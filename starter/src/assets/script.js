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

function addProductToCart(productId) {
  const product = products.find((item) => item.productId === productId);
  if (product) {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    product.quantity += 1;
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  const product = products.find((item) => item.productId === productId);
  const cartItem = cart.find(item => item.productId === productId);
  if (product && cartItem) {
    product.quantity += 1;
    cartItem.quantity += 1;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity(productId) {
  const product = products.find((item) => item.productId === productId);
  const cartItem = cart.find(item => item.productId === productId);
  if (product && cartItem) {
    if (cartItem.quantity > 1) {
      product.quantity -= 1;
      cartItem.quantity -= 1;
    } else {
      product.quantity = 0;
      cart = cart.filter((item) => item.productId !== productId);
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  const product = products.find((item) => item.productId === productId);
  if (product) {
    product.quantity = 0;
  }
  cart = cart.filter((item) => item.productId !== productId);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
let totalPaid = 0;

function cartTotal() {
  let total = 0;
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

function pay(amount) {
  totalPaid+=amount;
  const total = cartTotal();
  return totalPaid - total;
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

function emptyCart() {
  // cart.length=0;
  cart.splice(0, cart.length);
  return cart;
}

//I was able to only convert from USD to other currencies, because currency function takes only one argument.
function currency(curr){
if (curr ==='EUR'){
  products.forEach(item=>item.price=(item.price*0.9).toFixed(2))
}
else if (curr === 'YEN'){
  products.forEach(item=>item.price=(item.price*143.69).toFixed(2))
}
else {
  products.forEach(item=>item.price=(item.price*1).toFixed(2))
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
