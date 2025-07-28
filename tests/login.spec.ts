import { test, expect } from '../fixtures/fixtures';

// Adjust these as needed for your app
const VALID_USERNAME = 'Heath93';
const VALID_PASSWORD = 's3cret';
const INVALID_USERNAME = 'invalidUser';
const INVALID_PASSWORD = 'invalidPass';


test.describe('Login Page', () => {
  test('should log in successfully with valid credentials', async ({ loginPage, sidebarPage, page }) => {
    await loginPage.enterLoginDetails(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.clickSubmit();
    await sidebarPage.isHomeDisplayed();
  });

  test('should show error with invalid credentials', async ({ loginPage, page }) => {
    await loginPage.enterLoginDetails(INVALID_USERNAME, INVALID_PASSWORD);
    await loginPage.clickSubmit();
    expect(await loginPage.getErrorMessage())
      .toBe('Username or password is invalid');
  });

  test('should show validation errors with empty fields', async ({ loginPage, page }) => {
    await loginPage.enterLoginDetails('', '');
    await expect(loginPage.usernameRequiredError).toBeVisible();
    expect(await loginPage.getUsernameRequiredError())
      .toBe('Username is required');
  });

  test('should allow checking the Remember me checkbox', async ({ loginPage }) => {
    await loginPage.enterLoginDetails(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.rememberMeCheckbox.check();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
  });

  test('should display and navigate to Sign Up link', async ({ loginPage, page }) => {
    await expect(loginPage.signUpLink).toBeVisible();
    await loginPage.signUpLink.click();
    await expect(page).toHaveURL('/signin');
  });
});
