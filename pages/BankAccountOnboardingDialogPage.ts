import { Page, Locator } from '@playwright/test';

export class BankAccountOnboardingDialogPage {
  readonly page: Page;
  readonly dialog: Locator;
  readonly title: Locator;
  readonly content: Locator;
  readonly logoutButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.title = page.getByTestId('user-onboarding-dialog-title');
    this.content = page.getByTestId('user-onboarding-dialog-content');
    this.logoutButton = page.getByTestId('user-onboarding-logout');
    this.nextButton = page.getByTestId('user-onboarding-next');
    // this.dialog = page.locator('[role="dialog"]');
    // this.title = page.locator('[data-test="user-onboarding-dialog-title"]');
    // this.content = page.locator('[data-test="user-onboarding-dialog-content"]');
    // this.logoutButton = page.locator('[data-test="user-onboarding-logout"]');
    // this.nextButton = page.locator('[data-test="user-onboarding-next"]');
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  async getContent(): Promise<string> {
    return (await this.content.textContent())?.trim() ?? '';
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async clickNext() {
    await this.nextButton.click();
  }
}
