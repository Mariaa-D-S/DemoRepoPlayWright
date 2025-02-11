import { test, expect } from '@playwright/test';


const url = 'https://saucedemo.com'
const username = 'standard_user'
const password = 'secret_sauce'
const errorMessage = '.error-message-container error'

test('add  data ', async ({ page }) => {
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



