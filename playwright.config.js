// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: true, // Set to true for headless mode globally
    // Add other configurations here
  },
  // Add more global settings here if needed
});
