import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';
import { UserSettingsPage } from '../pages/UserSettingsPage';
import { BankAccountsPage } from '../pages/BankAccountsPage';
import { CreateBankAccountPage } from '../pages/CreateBankAccountPage';
import { BankAccountOnboardingDialogPage } from '../pages/BankAccountOnboardingDialogPage';

type Fixtures = {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
  userSettingsPage: UserSettingsPage;
  bankAccountsPage: BankAccountsPage;
  createBankAccountPage: CreateBankAccountPage;
  bankAccountOnboardingDialogPage: BankAccountOnboardingDialogPage;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  sidebarPage: async ({ page }, use) => {
    const sidebarPage = new SidebarPage(page);
    await use(sidebarPage);
  },
  userSettingsPage: async ({ page }, use) => {
    const userSettingsPage = new UserSettingsPage(page);
    await use(userSettingsPage);
  },
  bankAccountsPage: async ({ page }, use) => {
    const bankAccountsPage = new BankAccountsPage(page);
    await use(bankAccountsPage);
  },
  createBankAccountPage: async ({ page }, use) => {
    const createBankAccountPage = new CreateBankAccountPage(page);
    await use(createBankAccountPage);
  },
  bankAccountOnboardingDialogPage: async ({ page }, use) => {
    const bankAccountOnboardingDialogPage = new BankAccountOnboardingDialogPage(page);
    await use(bankAccountOnboardingDialogPage);
  },
});

export { test, expect };
