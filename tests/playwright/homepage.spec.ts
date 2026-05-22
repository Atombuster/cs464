import { test, expect } from '@playwright/test'

import { APP_TITLE } from '../../src/constants/app'

import { pause } from "./utils/pause"

test.skip('homepage has title', async ({ page }) => {
  // Go to the site
  await page.goto('localhost:3000')

  // Check the page title
  await expect(page).toHaveTitle(APP_TITLE)

//   // Check visible text
//   await expect(
//     page.getByRole('heading', { name: 'Example Domain' })
//   ).toBeVisible();

//   // Click a link
//   await page.getByRole('link', { name: 'More information...' }).click();

//   // Verify navigation
//   await expect(page).toHaveURL(/iana.org/);

// Wait three seconds so we can see the browser before it closes upon completing testing
await pause(3000)
});