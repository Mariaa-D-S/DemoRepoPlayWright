import { expect, Page } from "@playwright/test";
import CheckOutStepOneActions from "../sections/checkOutStepOneActions";
import CheckOutDetails from "../sections/checkOutDetails";

export default class CheckOutStepOne {
  page: Page;
  checkOutStepOne: CheckOutStepOneActions;
  checkOutDetails: CheckOutDetails;

  constructor(page: Page) {
    this.page = page;
    this.checkOutStepOne = new CheckOutStepOneActions(this.page);
    this.checkOutDetails = new CheckOutDetails(this.page);
  }

  public async goto() {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  public async cancel(){
    await this.goto();
    await this.checkOutStepOne.clickCancel();
  }

  public async checkoutData(){
    await this.goto();
    await this.checkOutDetails.addCheckoutData();
    await this.checkOutStepOne.clickContinue();
  }

  public async checkoutEmptyData(){
    await this.goto();
    await this.checkOutDetails.emptyCheckoutData();
    await this.checkOutStepOne.clickContinue();
  }
}