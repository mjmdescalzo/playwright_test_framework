---
applyTo: '**'
---
# Code Style and Conventions

- Use TypeScript for all test files and configuration.
- Follow Playwright’s recommended test structure and assertion patterns.
- Use async/await for all Playwright actions.
- Prefer descriptive test names and comments for clarity.
- Implement Page Object Model (POM) for UI interactions:
  - Each page/component gets a class in `pages/`.
  - Encapsulate selectors and methods in each class.
  - Instantiate page objects in tests and use their methods for actions/assertions.
- Use custom fixtures in a `fixtures/` directory for reusable setup/teardown logic.
- Prefer semantic, accessible selectors for locators (getByRole, getByLabel, etc.).
- Avoid hard-coded waits; use Playwright’s built-in waiting mechanisms.
- Assert expected outcomes using Playwright’s expect API.
- Place new test files in `tests/` unless they are examples/demos.
- Use `test.describe` to group related tests.
- Keep code idiomatic and concise.
- Document custom utilities/helpers.
- Update `.github/copilot-instructions.md` if conventions change.