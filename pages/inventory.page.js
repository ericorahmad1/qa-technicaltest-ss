// pages/inventory.page.js
class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async addItemToCart(itemName) {
        await this.page.click(`text=${itemName}`);
    }

    async addMultipleItemsToCart(itemCount) {
        // const items = await this.page.$$('.inventory_item');
        // for (let i = 0; i < itemCount; i++) {
        //     await items[i].click('[data-test^="add-to-cart"]');
        //     await items[i].$('button').click();
        // }
        const items = await this.page.$$('[data-test="inventory-item"]');
        // Step 2: Collect all buttons inside the selected items
        const buttons = [];
        items.forEach(item => {
        const button = item.$('[type=button]')
        
        if (button) {
            buttons.push(button);
         }
        });

    }

    async goToCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async removeItemFromCart(itemIndex) {
        const items = await this.page.$$('.cart_item');
        await items[itemIndex].$('button').click();
    }
}

module.exports = InventoryPage;
