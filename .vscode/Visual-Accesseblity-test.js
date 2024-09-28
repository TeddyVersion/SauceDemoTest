const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

test('Visual and Accessibility Tests for Cart and Checkout Flow', async ({ page }) => {
  // Step 1: Navigate to SauceDemo and log in
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Visual and Accessibility Test after login
  const loginScreenshot = await page.screenshot();
  expect(loginScreenshot).toMatchSnapshot('login-page.png');
  const loginAccessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(loginAccessibilityScan.violations).toHaveLength(0); // Fail if there are accessibility violations

  // Step 2: Add multiple items to the cart
  await page.click('.inventory_item:nth-of-type(1) .btn_inventory'); // Add first item
  await page.click('.inventory_item:nth-of-type(2) .btn_inventory'); // Add second item
  await page.click('.inventory_item:nth-of-type(3) .btn_inventory'); // Add third item

  // Verify cart count (should be 3)
  const cartItemCount = await page.textContent('.shopping_cart_badge');
  expect(cartItemCount).toBe('3');

  // Visual Test on Inventory Page (after items added)
  const inventoryScreenshot = await page.screenshot();
  expect(inventoryScreenshot).toMatchSnapshot('inventory-page.png');

  // Accessibility Test on Inventory Page
  const inventoryAccessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(inventoryAccessibilityScan.violations).toHaveLength(0);

  // Step 3: Go to the cart and verify the items
  await page.click('.shopping_cart_link');

  // Verify three items in the cart
  const cartItemsCount = await page.$$eval('.cart_item', items => items.length);
  expect(cartItemsCount).toBe(3);

  // Visual Test on Cart Page
  const cartScreenshot = await page.screenshot();
  expect(cartScreenshot).toMatchSnapshot('cart-page.png');

  // Accessibility Test on Cart Page
  const cartAccessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(cartAccessibilityScan.violations).toHaveLength(0);

  // Step 4: Proceed to checkout
  await page.click('#checkout');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // Verify overview page (items in checkout)
  const overviewItemsCount = await page.$$eval('.cart_item', items => items.length);
  expect(overviewItemsCount).toBe(3);

  // Visual Test on Checkout Overview Page
  const overviewScreenshot = await page.screenshot();
  expect(overviewScreenshot).toMatchSnapshot('checkout-overview-page.png');

  // Accessibility Test on Checkout Overview Page
  const overviewAccessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(overviewAccessibilityScan.violations).toHaveLength(0);

  // Step 5: Finish checkout
  await page.click('#finish');

  // Step 6: Verify checkout completion
  const confirmationMessage = await page.textContent('.complete-header');
  expect(confirmationMessage).toContain('THANK YOU FOR YOUR ORDER');

  // Visual Test on Confirmation Page
  const confirmationScreenshot = await page.screenshot();
  expect(confirmationScreenshot).toMatchSnapshot('order-confirmation.png');

  // Accessibility Test on Confirmation Page
  const confirmationAccessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(confirmationAccessibilityScan.violations).toHaveLength(0);
});
