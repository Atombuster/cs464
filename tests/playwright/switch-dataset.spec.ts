import { test, expect } from '@playwright/test'

test('Switching dataset updates the displayed content', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Open the dataset dropdown (MUI Select renders as a combobox)
  const select = page.getByRole('combobox')
  await expect(select).toBeVisible({ timeout: 10000 })
  await select.click()

  // Wait for options to populate (API fetch on mount)
  const options = page.locator('[role="option"]')
  await expect(options.first()).toBeVisible({ timeout: 10000 })

  // Need at least two datasets to test switching
  const count = await options.count()
  expect(count).toBeGreaterThanOrEqual(2)

  // Record the first option's title, then pick the second
  const firstTitle = await options.nth(0).innerText()
  const secondTitle = await options.nth(1).innerText()
  await options.nth(1).click()

  // Dataset header should now reflect the selected dataset
  const header = page.locator('h4')
  await expect(header).toHaveText(secondTitle, { timeout: 10000 })
  expect(secondTitle).not.toBe(firstTitle)
})
