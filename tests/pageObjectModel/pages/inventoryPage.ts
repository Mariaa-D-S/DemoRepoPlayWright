import { expect, Page } from "@playwright/test";
export default class InventoryPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  
}