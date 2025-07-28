import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly rememberMeLabel: Locator;
  readonly submitButton: Locator;
  readonly signUpLink: Locator;
  readonly errorMessage: Locator;
  readonly usernameRequiredError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.signUpLink = page.getByRole('link', { name: /Sign Up/i });
    this.errorMessage = page.locator('[data-test="signin-error"] .MuiAlert-message');
    this.usernameRequiredError = page.locator('#username-helper-text');
  }

  async getUsernameRequiredError(): Promise<string> {
    return (await this.usernameRequiredError.textContent())?.trim() ?? '';
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async goto() {
    await this.page.goto('/signin'); // Update path if needed
  }

  async enterLoginDetails(username: string, password: string, rememberMe: boolean = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
