import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Define custom fixtures
interface Fixtures {
  page: Page;
  loginPage: LoginPage;
}

const test = base.extend<Fixtures>({
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { test, expect };
