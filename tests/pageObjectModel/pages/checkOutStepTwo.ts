import { expect, Page } from "@playwright/test";
import CheckOutStepTwoActions from "../sections/checkOutStepTwoActions";

export default class CheckOutStepTwo {
  page: Page;
  checkOutStepTwoActions: CheckOutStepTwoActions;


  constructor(page: Page) {
    this.page = page;
    this.checkOutStepTwoActions = new CheckOutStepTwoActions(this.page);
  }

  public async goto() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  public async cancel(){
    await this.goto();
    await this.checkOutStepTwoActions.clickCancel();
  }

  public async finish(){
    await this.goto();
    await this.checkOutStepTwoActions.clickFinish();
  }
}