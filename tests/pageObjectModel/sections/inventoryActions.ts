import { Page } from "@playwright/test";
export default class InventoryActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addToCartButton = () => this.page.locator('#add-to-cart-sauce-labs-backpack')
  shoppinCartButton = () => this.page.locator('#shopping_cart_container')

  public async clickAddToCart() {
    await this.addToCartButton().click();
  }

  public async clickShoppingCart(){
    await this.shoppinCartButton().click();
  }
}