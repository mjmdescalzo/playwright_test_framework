---
applyTo: '**'
---
# What to Do When a Task is Completed

1. Run all Playwright tests to verify correctness:
   - `npm test` or `npx playwright test`
2. Review the Playwright HTML report for failures:
   - `npm run test:report`
3. If adding or updating dependencies, run `npm ci` to ensure a clean install.
4. If new browsers are required, run `npx playwright install --with-deps`.
5. For CI/CD, ensure GitHub Actions workflow passes (see `.github/workflows/playwright.yml`).
6. Commit and push changes using Git.
7. Document any new utilities, helpers, or conventions in `.github/copilot-instructions.md`.
8. Keep code and documentation up to date and idiomatic.