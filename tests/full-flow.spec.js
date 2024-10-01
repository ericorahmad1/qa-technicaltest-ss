// tests/full-flow.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

test('Full flow test: Login -> Random Select Items -> Cart -> Remove -> Checkout', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds

    // Navigate to the website
    await page.goto('https://www.saucedemo.com/');

    // Login using updated locators
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Randomly select between 2 to 4 items using updated locators
    const items = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt', 'sauce-labs-fleece-jacket'];
    const randomItems = getRandomInt(2, 5);
    for (let i = 0; i < randomItems; i++) {
        await page.locator(`[data-test="add-to-cart-${items[i]}"]`).click();
    }

    // Go to the cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Wait for cart to load (explicit wait)
    await page.waitForSelector('.cart_item', { timeout: 10000 }); // Wait up to 10 seconds for cart items to appear

    // Remove 1 item from the cart (in this case, removing 'sauce-labs-fleece-jacket')
    if (await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').isVisible()) {
        await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    } else {
        console.log('Item not found in cart, skipping removal.');
    }

    // Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Fill in the form
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('123456');

    // Continue checkout
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two/);

    // Finish the process
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('h2')).toHaveText('Thank you for your order!');

    // Back to products
    await page.locator('[data-test="back-to-products"]').click();
});