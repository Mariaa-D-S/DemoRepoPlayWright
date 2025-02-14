import { expect, Page } from "@playwright/test";
import InventoryActions from "../sections/inventoryActions";

export default class InventoryPage {
  page: Page;
  inventoryActions: InventoryActions;


  constructor(page: Page) {
    this.page = page;
    this.inventoryActions = new InventoryActions(this.page);
  }

  public async goto() {
    //await this.page.goto("https://www.saucedemo.com/inventory.html");
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  public async addToCart() {
    await this.goto();
    await this.inventoryActions.clickAddToCart();
  }

  public async cart() {
    await this.goto();
    await this.inventoryActions.clickShoppingCart();
  }
}