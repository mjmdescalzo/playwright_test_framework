import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';
import { UserSettingsPage } from '../pages/UserSettingsPage';
interface Fixtures {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
  userSettingsPage: UserSettingsPage;
}

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
});

export { test, expect };
