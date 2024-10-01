// pages/inventory.page.js
class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async addItemToCart(itemName) {
        await this.page.click(`text=${itemName}`);
    }

    async addMultipleItemsToCart(itemCount) {
        const items = await this.page.$$('.inventory_item');
        for (let i = 0; i < itemCount; i++) {
            await items[i].$('button').click();
        }
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async removeItemFromCart(itemIndex) {
        const items = await this.page.$$('.cart_item');
        await items[itemIndex].$('button').click();
    }
}

module.exports = InventoryPage;
