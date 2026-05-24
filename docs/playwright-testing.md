# Playwright Testing

Playwright is used for end-to-end browser testing.

## Setup

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

npm install installs Playwright packages.  
npx playwright install downloads browser binaries required to run tests.

---

## Run Tests

Tests are located in `tests/playwright`.

To run all tests:

```bash
npx playwright test
```

To run a single test file:

```bash
npx playwright test tests/playwright/solver.spec.ts
```

To run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

To debug tests:

```bash
npx playwright test --debug
```

---

## Skipping Tests

You can skip a test using:

test.skip()

---

## Configuration

Playwright configuration is located in:

playwright.config.ts

Common options include:

use: {
  headless: false
}

Setting headless: false makes the browser visible during test runs.
