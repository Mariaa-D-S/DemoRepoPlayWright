import { Page } from "@playwright/test";
export default class CheckOutDetails {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  firstNameTextbox = () => this.page.locator("#first-name");
  lastNameTextbox = () => this.page.locator("#last-name");
  postalcodeTextbox = () => this.page.locator("#postal-code");
  
  
  public async addCheckoutData() {
    await this.firstNameTextbox().fill("baba");
    await this.lastNameTextbox().fill("qga");
    await this.postalcodeTextbox().fill("1111");
  }

  public async emptyCheckoutData() {
    await this.firstNameTextbox().fill("");
    await this.lastNameTextbox().fill("");
    await this.postalcodeTextbox().fill("");
  }
}