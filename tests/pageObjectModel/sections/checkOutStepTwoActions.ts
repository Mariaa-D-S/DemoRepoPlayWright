import { Page } from "@playwright/test";
export default class CheckOutStepTwoActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  cancelButton = () => this.page.locator('#cancel')
  finishButton = () => this.page.locator('#finish')

  public async clickCancel() {
    await this.cancelButton().click();
  }

  public async clickFinish() {
    await this.finishButton().click();
  }
}