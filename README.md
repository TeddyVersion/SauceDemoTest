SauceDemoTest

Overview

This project automates the testing of the SauceDemo web application, a popular demo site for e-commerce testing. The tests are implemented using Playwright to ensure robust testing and reliable functionality across various user scenarios.

Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
npm (Node Package Manager)
Playwright (installed via npm)
A Sauce Labs account (for remote testing)
Installation
Clone this repository:

bash
Copy code
git clone https://github.com/TeddyVersion/saucedemotest.git
cd saucedemotest
Install the dependencies:

bash
Copy code
npm install
Running the Tests
To run the tests, use the following command:

bash
Copy code
npx playwright test

You can also specify a particular test file or scenario to run:

bash
Copy code
npx playwright test tests/sorting.test.js
Test Scenarios
User Login

Test Case: Validate successful login with valid credentials.
Steps:

Navigate to the SauceDemo login page.
Enter valid username and password.
Click the login button.
Verify the user is redirected to the inventory page.
Add to Cart
Test Case: Verify adding items to the cart.

Steps:

Login with valid credentials.
Navigate to the inventory page.
Select an item and add it to the cart.
Verify the item is present in the cart.
Checkout Process
Test Case: Validate the checkout process.

Steps:

Add items to the cart.
Navigate to the cart.
Proceed to checkout.
Fill in the required shipping information.
Complete the purchase.
Verify the order confirmation message.
