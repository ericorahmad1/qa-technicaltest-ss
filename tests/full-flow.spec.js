// tests/full-flow.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

test('Full flow test: Login -> Random Select Items -> Cart -> Remove -> Checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Randomly select between 2 to 4 items
    const randomItems = getRandomInt(2, 5);
    await inventoryPage.addMultipleItemsToCart(randomItems);

    // Go to Cart
    await inventoryPage.goToCart();

    // Remove 1 item
    await inventoryPage.removeItemFromCart(0);
    
    // Proceed to Checkout
    await page.click('#checkout');

    // Fill in form
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');

    // Continue checkout
    await page.click('#continue');
    await expect(page).toHaveURL(/checkout-step-two/);

    // Finish the process
    await page.click('#finish');
    await expect(page).toHaveText('h2', 'THANK YOU FOR YOUR ORDER');
});
