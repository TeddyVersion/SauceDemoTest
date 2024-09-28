const { test, expect } = require('@playwright/test');

test('Add multiple items to the cart and complete the checkout', async ({ page }) => {
  // Step 1: Navigate to the website and log in
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Step 2: Add multiple items to the cart
  await page.click('.inventory_item:nth-of-type(1) .btn_inventory'); // Add first item
  await page.click('.inventory_item:nth-of-type(2) .btn_inventory'); // Add second item
  await page.click('.inventory_item:nth-of-type(3) .btn_inventory'); // Add third item

  // Verify that the cart icon shows the correct item count (3)
  const cartItemCount = await page.textContent('.shopping_cart_badge');
  expect(cartItemCount).toBe('3');

  console.log('Items added to the cart successfully.');

  // Step 3: Go to the cart and verify the items
  await page.click('.shopping_cart_link');

  // Verify that three items are in the cart
  const cartItemsCount = await page.$$eval('.cart_item', items => items.length);
  expect(cartItemsCount).toBe(3);

  // You can also verify the names of the items to ensure correctness
  const cartItemNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
  console.log('Items in cart:', cartItemNames);

  // Step 4: Proceed to the checkout
  await page.click('#checkout');

  // Fill in checkout information
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Step 5: Verify the overview page
  const overviewItemsCount = await page.$$eval('.cart_item', items => items.length);
  expect(overviewItemsCount).toBe(3);

  // Step 6: Finish checkout
  await page.click('#finish');

  // Step 7: Confirm successful checkout
  const confirmationMessage = await page.textContent('.complete-header');
  expect(confirmationMessage).toContain('THANK YOU FOR YOUR ORDER');

  console.log('Order completed successfully.');

  // Visual Test: Take screenshot of the confirmation page and compare with baseline
  const confirmationScreenshot = await page.screenshot();
  expect(confirmationScreenshot).toMatchSnapshot('order-confirmation.png');
});
