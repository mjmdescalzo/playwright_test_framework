---
applyTo: '**'
---
# Suggested Commands

## Install dependencies
```
npm ci
```

## Run all Playwright tests
```
npm test
```

## Run Playwright tests in UI mode
```
npm run test:ui
```

## Show Playwright HTML report
```
npm run test:report
```

## Launch Playwright codegen tool
```
npm run codegen
```

## Install Playwright browsers (if needed)
```
npx playwright install --with-deps
```

## Run tests directly (alternative)
```
npx playwright test
```

## Git basics (Windows Bash)
```
git status
git add <file>
git commit -m "message"
git push
```

## List files (Windows Bash)
```
ls
```

## Change directory (Windows Bash)
```
cd <directory>
```

## Search in files (Windows Bash)
```
grep "pattern" <file>
```

## Find files (Windows Bash)
```
find . -name "pattern"
```

## Run Playwright in CI (GitHub Actions)
- See `.github/workflows/playwright.yml` for CI setup.

# Notes
- All commands assume you are in the project root directory.
- Use `npm ci` for clean installs in CI environments.
- Playwright browsers must be installed before running tests for the first time.