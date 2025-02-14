import { test, expect } from '@playwright/test';
import LoginPage from './pageObjectModel/pages/loginPage';
import InventoryPage from './pageObjectModel/pages/inventoryPage';
import CartPage from './pageObjectModel/pages/cartPage';
import CheckOutStepOne from './pageObjectModel/pages/checkOutStepOne';
import CheckOutStepTwo from './pageObjectModel/pages/checkOutStepTwo';
import CheckOutComplete from './pageObjectModel/pages/checkOutComplete';

test('add data optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.login();
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('add invalid data optimization', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.failedLogin();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('add empty data optimization', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.failedLoginEmpty();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('add to cart button optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.login();
  await inventoryPage.addToCart();

  await expect(page.getByText('Remove')).toBeVisible();
});

test('cart optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();

  await expect(page).toHaveURL(/.*cart.html/);
});

test('remove button in cart page optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.removeFromCart();
});

test('continue shopping button in cart page optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await loginPage.login();
  await inventoryPage.cart();

  await cartPage.continueShopping();
  await inventoryPage.goto();
});

test('checkout button in cart page optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);
});

test('checkout step one cancel optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.cancel();
  await cartPage.goto();
});

test('checkout with valid data optimization', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.checkoutData();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

test('checkout with empty data optimization', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.checkoutEmptyData();
  await expect(page.getByText('Error: First Name is required')).toBeVisible();
});

test('checkout step two cancel optimization', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  const checkOutStepTwo = new CheckOutStepTwo(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.checkoutData();
  await checkOutStepTwo.cancel();
  await inventoryPage.goto();
});

test('checkout finish optimization', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  const checkOutStepTwo = new CheckOutStepTwo(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.checkoutData();
  await checkOutStepTwo.finish();
  await expect(page).toHaveURL(/.*checkout-complete.html/);
});

test('back home after finished checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkOutStepOne = new CheckOutStepOne(page);
  const checkOutStepTwo = new CheckOutStepTwo(page);
  const checkOutComplete = new CheckOutComplete(page);
  await loginPage.login();
  await inventoryPage.addToCart();
  await inventoryPage.cart();
  await cartPage.checkOut();
  await checkOutStepOne.checkoutData();
  await checkOutStepTwo.finish();
  await checkOutComplete.backHome();
  await inventoryPage.goto();
});