import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';

// Define custom fixtures
interface Fixtures {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
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
});

export { test, expect };
