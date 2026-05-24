import { test, expect } from '@playwright/test'

import { APP_TITLE } from '../../src/constants/app'

import { pause } from "./utils/pause"

test('homepage has title', async ({ page }) => {
  // Go to the site
  await page.goto('localhost:3000')

  // Check the page title
  await expect(page).toHaveTitle(APP_TITLE)
});