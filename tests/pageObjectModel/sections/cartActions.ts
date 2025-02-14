import { Page } from "@playwright/test";
export default class CartActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  item = () => this.page.locator('#item_4_title_link')
  removeButton = () => this.page.locator('#remove-sauce-labs-backpack')
  continueButton = () => this.page.locator('#continue-shopping')
  checkOutButton = () => this.page.locator('#checkout')

  public async clickRemoveFromCart() {
    await this.item().isEnabled();
    await this.removeButton().click();
  }

  public async clickContinue(){
    await this.continueButton().click();
  }

  public async clickCheckOut(){
    await this.checkOutButton().click();
  }
}