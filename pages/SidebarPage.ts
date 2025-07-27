import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;
  readonly fullName: Locator;
  readonly username: Locator;
  readonly balance: Locator;
  readonly homeLink: Locator;
  readonly myAccountLink: Locator;
  readonly bankAccountsLink: Locator;
  readonly notificationsLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullName = page.getByTestId('sidenav-user-full-name');
    this.username = page.getByTestId('sidenav-username');
    this.balance = page.getByTestId('sidenav-user-balance');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.myAccountLink = page.getByRole('link', { name: 'My Account' });
    this.bankAccountsLink = page.getByRole('link', { name: 'Bank Accounts' });
    this.notificationsLink = page.getByRole('link', { name: 'Notifications' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async gotoHome() {
    await this.homeLink.click();
  }

  async gotoMyAccount() {
    await this.myAccountLink.click();
  }

  async gotoBankAccounts() {
    await this.bankAccountsLink.click();
  }

  async gotoNotifications() {
    await this.notificationsLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getFullName(): Promise<string> {
    return (await this.fullName.textContent()) ?? '';
  }

  async getUsername(): Promise<string> {
    return (await this.username.textContent()) ?? '';
  }

  async getBalance(): Promise<string> {
    return (await this.balance.textContent()) ?? '';
  }
}
