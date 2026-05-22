import { test, expect, Page } from '@playwright/test'

import { pause } from "./utils/pause"
import { clickButtonByText, getPuzzleItems, dragItemToIndex, isPuzzleSolved } from "./utils/interactions"

import { PuzzleItem } from "./types/types"

test('homepage has title', async ({ page }) => {
  test.setTimeout(300_000) // this sets the timeout to 300 seconds (5 minutes)

  // This sets the size of the window
  await page.setViewportSize({ width: 1400, height: 1000 })

  // Go to the site
  await page.goto('http://localhost:3000/puzzle/planets')

  // Clicking this button checks the order.
  await clickButtonByText(page, "Check Order")

  // TODO: Implement a solver
  await puzzleSolver(page)



  // Does the page display the solved text?
  // If your solver works, this test should pass!
  const solved = await isPuzzleSolved(page)
  expect(solved).toBe(true)

  await pause(2000)
})

async function puzzleSolver(page: Page) {

  await dragItemToIndex(page, 0, 2) // This will drag the 0th index to where the 2nd index currently is

  // You can use this function to click the "Check Order" button, which will highlight the correct choices.
  // You can use the functions below to get the solved, unsolved, or close indices 
  await clickButtonByText(page, "Check Order")

  return

}

function closeIndices(items: PuzzleItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter(x => x.item.state === "close")
    .map(x => x.index)
}

function correctIndices(items: PuzzleItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter(x => x.item.state === "close")
    .map(x => x.index)
}

function wrongIndices(items: PuzzleItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter(x => x.item.state !== "wrong")
    .map(x => x.index)
}

function unsolvedIndices(items: PuzzleItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter(x => x.item.state !== "correct")
    .map(x => x.index)
}