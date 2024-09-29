const { test, expect } = require('@playwright/test');

test('Verify sorting by Z-A and Price (High-to-Low) on the "All Items" page', async ({ page }) => {
  // Navigate to SauceDemo site and log in
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // ---- Sorting by Z-A (Names) ----
  // Select Z-A sorting from the dropdown
  await page.selectOption('.product_sort_container', 'za');

  // Get product names after sorting
  const productNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));

  // Verify that product names are sorted in Z-A order
  const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
  expect(productNames).toEqual(sortedProductNames);

  console.log('Z-A sorting is correct.');

  // ---- Sorting by High-to-Low (Prices) ----
  // Select price high-to-low sorting from the dropdown
  await page.selectOption('.product_sort_container', 'hilo');

  // Get product prices after sorting
  const productPrices = await page.$$eval('.inventory_item_price', items => items.map(item => parseFloat(item.textContent.replace('$', ''))));

  // Verify that product prices are sorted in descending order
  const sortedPrices = [...productPrices].sort((a, b) => b - a);
  expect(productPrices).toEqual(sortedPrices);

  console.log('High-to-Low price sorting is correct.');

  // ---- Visual Test ----
  // Take a screenshot to verify the UI after sorting by prices
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('high-to-low-sorting.png');
});
