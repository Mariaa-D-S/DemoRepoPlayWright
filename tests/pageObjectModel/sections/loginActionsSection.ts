import { Page } from "@playwright/test";
export default class LoginActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loginButton = () => this.page.locator('#login-button')

  public async clickLogin() {
    await this.loginButton().click();
  }
}