import { Page } from "@playwright/test";
export default class LoginDetails {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  usernameTextbox = () => this.page.locator("#user-name");
  passwordTextbox = () => this.page.locator("#password");
  
  
  public async addData() {
    await this.page.locator("#user-name").fill("standard_user");
    await this.page.locator("#password").fill("secret_sauce");
  }

  public async addInvalidData(){
    await this.usernameTextbox().fill("abrakadabra");
    await this.passwordTextbox().fill("123");
  }

  public async addEmptyData(){
    await this.usernameTextbox().fill("");
    await this.passwordTextbox().fill("");
  }
}