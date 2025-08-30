## Copilot Instructions for Playwright Test Automation

### Project Overview
This repository uses Playwright for end-to-end testing. Tests are written in TypeScript and organized under the `tests/` directories.

### Coding Guidelines
- Use TypeScript for all test files and configuration.
- Follow Playwright’s recommended patterns for test structure and assertions.
- Use async/await for all Playwright actions.
- Prefer descriptive test names and comments for clarity.

### Page Object Model (POM) Best Practices
- Implement the Page Object Model for all UI interactions:
  - Create a separate class for each page or component in a `pages/` directory.
  - Each class should encapsulate selectors and methods for interacting with that page/component.
  - Instantiate page objects in your tests and use their methods for actions and assertions.
- Example structure:
  ```typescript
  // pages/LoginPage.ts
    import { Page, Locator } from '@playwright/test';

    export class LoginPage {
      readonly page: Page;
      readonly usernameInput: Locator;
      readonly passwordInput: Locator;
      readonly submitButton: Locator;

      constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
      }

      async goto() {
          await this.page.goto('https://example.com/login');
      }

      async login(username: string, password: string) {
          await this.usernameInput.fill(username);
          await this.passwordInput.fill(password);
          await this.submitButton.click();
      }
    }
  ```
  ```typescript
  // tests/login.spec.ts
  import { test, expect } from '../fixtures/fixtures';

  test('user can log in', async ({ loginPage, page }) => {
    await loginPage.login('user', 'pass');
    await expect(page).toHaveURL('https://example.com/dashboard');
  });
  ```

### Using Fixtures for Test Setup and Teardown
- Create a `fixtures/` folder in your project root to organize custom fixtures.
- Inside `fixtures/`, create a `fixtures.ts` file for reusable setup logic.
- Use Playwright’s built-in fixtures and extend them for advanced scenarios:
  - Use `test.beforeEach` and `test.afterEach` for simple setup/teardown.
  - For more complex or reusable setups, use custom fixtures as shown below.
- Example for `fixtures/fixtures.ts`:
  ```typescript
  // fixtures/fixtures.ts
  import { test as base, expect, BrowserContext, Page } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';

  type Fixtures = {
    page: Page;
    loginPage: LoginPage;
  };

  const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await use(loginPage);
    }
  });

  export { test, expect };
  ```
- Import and use your custom fixtures in your test files for consistent, isolated, and maintainable test setup.
- This approach initializes page objects for easy access.

### Test Writing Best Practices
- Place new test files in the `tests/` directory unless they are examples or demos.
- Use `test.describe` to group related tests.
- Avoid hard-coded waits; use Playwright’s built-in waiting mechanisms.
- Assert expected outcomes using Playwright’s expect API.

### Locator Identification Best Practices

When identifying locators in Playwright, use the following order of preference:

1. **getByRole() with accessible name**
   - Example: `page.getByRole('button', { name: 'Submit' })`
   - Only use this if the element has a default Aria Role based on their element tag
      | Element                   | Default ARIA Role   |
      |---------------------------|--------------------|
      | <button>                  | button             |
      | <input type="text">       | textbox            |
      | <input type="checkbox">   | checkbox           |
      | <input type="radio">      | radio              |
      | <input type="range">      | slider             |
      | <input type="search">     | searchbox          |
      | <a href="...">            | link               |
      | <img alt="...">           | img                |
      | <select>                  | listbox            |
      | <option>                  | option             |
      | <textarea>                | textbox            |
      | <table>                   | table              |
      | <th>                      | columnheader/rowheader |
      | <tr>                      | row                |
      | <td>                      | cell               |
      | <ul>, <ol>                | list               |
      | <li>                      | listitem           |
      | <form>                    | form               |
      | <nav>                     | navigation         |
      | <header>                  | banner             |
      | <footer>                  | contentinfo        |
      | <main>                    | main               |
      | <h1>-<h6>                 | heading            |
      | <progress>                | progressbar        |
      | <dialog>                  | dialog             |
2. **getByLabel()**
   - Example: `page.getByLabel('Email')`
   - Only use this if the element is labeled by a <label> element (using for attribute or wrapping), or by aria-label, aria-labelledby, or other accessible labeling attribute
3. **getByText()**
   - Example: `page.getByText('Log out')`
4. **getByPlaceholder()**
   - Example: `page.getByPlaceholder('Search')`
5. **getByAltText()**
   - Example: `page.getByAltText('Company Logo')`
6. **getByTestId()**
   - Example: `page.getByTestId('user-profile')`
7. **CSS selectors (as a last resort)**
   - Example: `page.locator('.custom-class')`

**Summary:**
Always prefer semantic, accessible selectors (`getByRole`, `getByLabel`, etc.) for reliability and maintainability. Use CSS selectors only when necessary.

### Imports and Configuration
- Import Playwright test utilities from `@playwright/test`.
- Reference the shared configuration in `playwright.config.ts` for browser and test settings.

### Additional Notes
- Keep code idiomatic and concise.
- Document any custom utilities or helpers.
- Update this file if project conventions change.
- Do not make any assumptions when creating Locators and Page Objects. Always ask the user to provide image of the website or html. Always sak the user for which page the page objects needs to be created.