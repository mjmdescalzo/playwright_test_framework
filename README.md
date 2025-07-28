# Playwright Test Framework for Real World App

## Overview
This repository contains an end-to-end test automation framework built with [Playwright](https://playwright.dev/) in TypeScript. The framework is designed to test the "Real World App"—an open-source demo application made by the Cypress developer team.

## Application Under Test
**Real World App** is a modern, full-stack example application for demonstrating real-world scenarios in web testing. It was created by the Cypress developer team and is used here to showcase robust, maintainable, and idiomatic Playwright test automation.

## Features
- **TypeScript-based**: All tests and page objects are written in TypeScript for type safety and maintainability.
- **Page Object Model (POM)**: UI interactions are encapsulated in page object classes under the `pages/` directory.
- **Custom Fixtures**: Playwright fixtures are used for reusable setup and teardown logic, located in the `fixtures/` directory.
- **Robust Locators**: Uses Playwright's recommended locator strategies (`getByTestId`, `getByRole`, etc.) for reliability.
- **API Interception**: Supports intercepting and modifying API requests and responses for advanced test scenarios.
- **Comprehensive Coverage**: Includes tests for login, user settings, bank account management, onboarding, and more.

## Project Structure
```
├── fixtures/                  # Playwright custom fixtures
├── pages/                     # Page Object Model classes
├── tests/                     # Test specifications
├── playwright.config.ts       # Playwright configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## How to Run
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run all tests:**
   ```bash
   npx playwright test
   ```
3. **Open Playwright Test UI:**
   ```bash
   npx playwright test --ui
   ```
4. **View HTML report:**
   ```bash
   npx playwright show-report
   ```

## Writing Tests
- Place new test files in the `tests/` directory.
- Use the provided page objects and fixtures for all UI and API interactions.
- Prefer semantic and stable locators (`getByTestId`, `getByRole`, etc.).
- See existing test files for examples and best practices.

## Contributing
- Follow the existing code style and structure.
- Add or update page objects in the `pages/` directory.
- Add or update fixtures in the `fixtures/` directory.
- Document any new utilities or helpers.

## Credits
- **Application Under Test:** [Real World App](https://github.com/cypress-io/cypress-realworld-app) by the Cypress developer team
- **Framework:** Playwright, Microsoft
