import { test, expect } from '@playwright/test'

import { APP_TITLE } from '../../src/constants/app'

import { pause } from "./utils/pause"

import { clickButtonByText } from "./utils/interactions"

test.skip('homepage has title', async ({ page }) => {
  // Go to the site
  await page.goto('http://localhost:3000/puzzle/planets')

  // Check the page title
  await expect(page).toHaveTitle(APP_TITLE)

  await pause(500)

  clickButtonByText(page, "Check Order")

  await pause(500)

  await expect(
    page.locator('div.MuiAlert-message')
  ).toHaveText(/^\d+ of \d+ items are in the correct position\.$/);

  // Wait three seconds so we can see the browser before it closes upon completing testing
  await pause(3000)
});


