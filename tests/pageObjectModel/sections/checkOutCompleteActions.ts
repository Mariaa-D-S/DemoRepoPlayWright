import { Page } from "@playwright/test";
export default class CheckOutCompleteActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  backHomeButton = () => this.page.locator('#back-to-products')

  public async clickBackHome() {
    await this.backHomeButton().click();
  }
}