import { test, expect } from '@playwright/test';


const url = 'https://saucedemo.com'
const username = 'standard_user'
const password = 'secret_sauce'
const errorMessage = '.error-message-container error'
const firstName = 'Maria'
const lastName = 'Serkedzhieva'
const postCode = '4000'

test('add data ', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/.*inventory.html/);

});

test('add invalid data ', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.locator('#user-name').fill("ihnioiji")
  await page.locator('#password').fill("123")
  await page.locator('#login-button').click();

  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('add empty data ', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.locator('#user-name').fill("")
  await page.locator('#password').fill("")
  await page.locator('#login-button').click();

  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

});

test('add to cart button ', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await expect(page.getByText('Remove')).toBeVisible();
});

test('cart', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()

  await expect(page).toHaveURL(/.*cart.html/);
  //await expect(page.getByText('Your Cart')).toBeVisible();
});

test('remove button in cart page', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#remove-sauce-labs-backpack').click()
  await expect(page.locator('#item_4_title_link').isDisabled).toBeTruthy();
});

test('continue shopping button in cart page', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  //await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  //await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#continue-shopping').click()
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('checkout button in cart page', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
});

test('checkout step one cancel', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#cancel').click();
  await expect(page).toHaveURL(/.*cart.html/);
});

test('checkout with valid data', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#first-name').fill(firstName)
  await page.locator('#last-name').fill(lastName)
  await page.locator('#postal-code').fill(postCode)
  await page.locator('#continue').click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

test('checkout with empty data', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#first-name').fill("")
  await page.locator('#last-name').fill("")
  await page.locator('#postal-code').fill("")
  await page.locator('#continue').click();
  await expect(page.getByText('Error: First Name is required')).toBeVisible();
});

test('checkout finish', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#first-name').fill(firstName)
  await page.locator('#last-name').fill(lastName)
  await page.locator('#postal-code').fill(postCode)
  await page.locator('#continue').click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  await page.locator('#finish').click()
  await expect(page).toHaveURL(/.*checkout-complete.html/);
  await page.locator('.complete-header').isVisible();
});

test('checkout step two cancel', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#first-name').fill(firstName)
  await page.locator('#last-name').fill(lastName)
  await page.locator('#postal-code').fill(postCode)
  await page.locator('#continue').click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  await page.locator('#cancel').click()
  await expect(page).toHaveURL(/.*inventory.html/);
});


test('back home after finished checkout', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('#user-name').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('#add-to-cart-sauce-labs-backpack').click()
  await page.locator('#shopping_cart_container').click()
  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('#item_4_title_link').isEnabled();
  await page.locator('#checkout').click()
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.locator('#first-name').fill(firstName)
  await page.locator('#last-name').fill(lastName)
  await page.locator('#postal-code').fill(postCode)
  await page.locator('#continue').click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  await page.locator('#finish').click()
  await expect(page).toHaveURL(/.*checkout-complete.html/);
  
  await page.locator('#back-to-products').click()
  await expect(page).toHaveURL(/.*inventory.html/);
});


