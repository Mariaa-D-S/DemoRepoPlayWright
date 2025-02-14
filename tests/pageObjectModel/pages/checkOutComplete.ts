import { expect, Page } from "@playwright/test";
import CheckOutCompleteActions from "../sections/checkOutCompleteActions";

export default class CheckOutComplete {
  page: Page;
  checkoutCompleteActions: CheckOutCompleteActions;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCompleteActions = new CheckOutCompleteActions(this.page);
  }

  header = () => this.page.locator('.complete-header');

  public async goto() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
  }

  public async backHome(){
    await this.goto();
    await this.header().isVisible();
    await this.checkoutCompleteActions.clickBackHome();
  }
}
