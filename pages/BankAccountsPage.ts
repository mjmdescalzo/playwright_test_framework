import { Page, Locator } from '@playwright/test';

export class BankAccountsPage {
  readonly page: Page;
  readonly createButton: Locator;
  readonly accountList: Locator;
  readonly accountListItems: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.locator('[data-test="bankaccount-new"]');
    this.accountList = page.locator('[data-test="bankaccount-list"]');
    this.accountListItems = page.locator('[data-test^="bankaccount-list-item-"]');
    this.deleteButton = page.locator('[data-test="bankaccount-delete"]');
  }

  async clickCreate() {
    await this.createButton.click();
  }

  async getAccountNames(): Promise<string[]> {
    const items = await this.accountListItems.locator('p').allTextContents();
    return items.map(text => text.trim());
  }

  async deleteFirstAccount() {
    const firstDeleteBtn = this.accountListItems.first().locator('[data-test="bankaccount-delete"]');
    await firstDeleteBtn.click();
  }

  async deleteAccountByName(name: string) {
    const items = this.accountListItems;
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const accountName = await item.locator('p').textContent();
      if (accountName?.trim() === name) {
        await item.locator('[data-test="bankaccount-delete"]').click();
        break;
      }
    }
  }
}
