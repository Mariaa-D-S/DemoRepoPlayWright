import { expect, Page } from "@playwright/test";
import LoginDetails from "../sections/loignDetailsSection";
import LoginActions from "../sections/loginActionsSection";

export default class LoginPage {
  page: Page;
  loginDetails: LoginDetails
  loginActions: LoginActions

  constructor(page: Page) {
    this.page = page;
    this.loginDetails = new LoginDetails(this.page);
    this.loginActions = new LoginActions(this.page);
  }

  public async goto() {
    await this.page.goto("https://saucedemo.com");
  }

  public async assertTitle (){
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  public async login(){
    await this.assertTitle();
    await this.loginDetails.addData();
    await this.loginActions.clickLogin();
  }

  public async failedLogin(){
    await this.assertTitle();
    await this.loginDetails.addInvalidData();
    await this.loginActions.clickLogin();
  }

  public async failedLoginEmpty(){
    await this.assertTitle();
    await this.loginDetails.addEmptyData();
    await this.loginActions.clickLogin();
  }

}