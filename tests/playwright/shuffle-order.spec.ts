import { test, expect } from '@playwright/test'

import { APP_TITLE } from '../../src/constants/app'

import { clickButtonByText, getPuzzleItems } from "./utils/interactions"

test('Check Shuffle Button is Functional', async ({ page }) => {
  // Go to the site
  await page.goto('http://localhost:3000/puzzle/planets')

  // Check the page title
  await expect(page).toHaveTitle(APP_TITLE)

  // Wait for the puzzle items to load
  await page.locator('[data-state]').first().waitFor()

  // Get the initial order of items
  const initialOrder = await getPuzzleItems(page)
//   console.log('Initial order:', initialOrder.map(item => item.label))

  // Click the Shuffle button
  await clickButtonByText(page, "Shuffle")

  // Get the new order after shuffling
  const shuffledOrder = await getPuzzleItems(page)
//   console.log('Shuffled order:', shuffledOrder.map(item => item.label))

  // Verify that the order has changed
  const orderChanged = initialOrder.some((item, index) => item.label !== shuffledOrder[index].label)
//   console.log('Order changed:', orderChanged)
  expect(orderChanged).toBe(true)

});


