// tests/select-items.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

test('Select 2 items and verify cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addMultipleItemsToCart(2);
    await inventoryPage.goToCart();
    
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(2);
});

test('Select 3 items and verify cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addMultipleItemsToCart(3);
    await inventoryPage.goToCart();

    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(3);
});

test('Select 4 items and verify cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addMultipleItemsToCart(4);
    await inventoryPage.goToCart();

    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(4);
});
