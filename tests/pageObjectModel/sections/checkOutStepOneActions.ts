import { Page } from "@playwright/test";
export default class CheckOutStepOneActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  cancelButton = () => this.page.locator('#cancel')
  continueButton = () => this.page.locator('#continue')

  public async clickCancel() {
    await this.cancelButton().click();
  }

  public async clickContinue() {
    await this.continueButton().click();
  }
}