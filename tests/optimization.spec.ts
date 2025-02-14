import { test, expect } from '@playwright/test';
import LoginPage from './pageObjectModel/pages/loginPage';
import InventoryPage from './pageObjectModel/pages/inventoryPage';

test('add data optimization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
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