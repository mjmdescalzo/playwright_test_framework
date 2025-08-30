---
applyTo: '**'
---
# Project Purpose
This project is an end-to-end test automation framework using Playwright. It is designed to run browser-based tests written in TypeScript, organized under the `tests/` directory. The framework supports cross-browser testing and is configured for CI/CD integration via GitHub Actions.

# Tech Stack
- Playwright (`@playwright/test`)
- TypeScript
- Node.js (with npm)

# Code Style & Conventions
- All test files and configuration are written in TypeScript.
- Playwright’s recommended patterns for test structure and assertions are followed.
- Async/await is used for all Playwright actions.
- Descriptive test names and comments are preferred.
- Page Object Model (POM) is recommended for UI interactions, with each page/component in a `pages/` directory.
- Custom fixtures are placed in a `fixtures/` directory.
- Semantic, accessible selectors are preferred for locators (getByRole, getByLabel, etc.).

# Directory Structure
- `tests/`: Main test files
- `tests-examples/`: Example/demo test files
- `.github/`: Project instructions, workflows, and chatmodes
- `playwright.config.ts`: Playwright configuration
- `package.json`: Project metadata and scripts

# Additional Guidelines
- Avoid hard-coded waits; use Playwright’s built-in waiting mechanisms.
- Assert expected outcomes using Playwright’s expect API.
- Keep code idiomatic and concise.
- Document custom utilities or helpers.
- Update `.github/copilot-instructions.md` if conventions change.