import { expect, Page } from "@playwright/test";
import CartActions from "../sections/cartActions";

export default class CartPage {
  page: Page;
  cartActions: CartActions;


  constructor(page: Page) {
    this.page = page;
    this.cartActions = new CartActions(this.page);
  }

  item = () => this.page.locator('#item_4_title_link');

  public async goto() {
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  public async removeFromCart() {
    await this.goto();
    await this.cartActions.clickRemoveFromCart();
    await expect(this.item().isDisabled).toBeTruthy();
  }

  public async continueShopping(){
    await this.goto();
    await this.cartActions.clickContinue();
  }

  public async checkOut(){
    await this.item().isEnabled();
    await this.cartActions.clickCheckOut();
  }
}