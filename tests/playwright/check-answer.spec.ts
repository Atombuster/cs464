import { test, expect } from '@playwright/test'

import { APP_TITLE } from '../../src/constants/app'

import { clickButtonByText } from "./utils/interactions"

test('Check Answer Button is Functional', async ({ page }) => {
  // Go to the site
  await page.goto('http://localhost:3000/puzzle/planets')

  // Check the page title
  await expect(page).toHaveTitle(APP_TITLE)

  // Wait for the puzzle items to load
  await page.locator('[data-state]').first().waitFor()

  await clickButtonByText(page, "Check Order")

  await expect(
    page.locator('div.MuiAlert-message')
  ).toHaveText(/^\d+ of \d+ items are in the correct position\.$/);

});


