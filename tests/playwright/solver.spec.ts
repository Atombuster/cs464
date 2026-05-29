import { test, expect, Page } from '@playwright/test'
import { clickButtonByText, getPuzzleItems, dragItemToIndex, isPuzzleSolved } from "./utils/interactions"
import { PuzzleItem } from "./types/types"

test('Puzzle is Solvable', async ({ page }) => {
  test.setTimeout(300_000) // this sets the timeout to 300 seconds (5 minutes)

  // This sets the size of the window
  // if you are using larger datasets, you may need to increase the height of the viewport to allow all components to fit in the screen (you can also manually scroll everything into vew)
  await page.setViewportSize({ width: 1400, height: 1000 })

  // Go to the site
  await page.goto('http://localhost:3000/puzzle/planets')

  // Wait for the puzzle items to load
  await page.locator('[data-state]').first().waitFor()

  await puzzleSolver(page)

  const solved = await isPuzzleSolved(page)
  expect(solved).toBe(true)
})

async function puzzleSolver(page: Page) {

  while (true){
    await clickButtonByText(page, "Check Order")
    const puzzleItems = await getPuzzleItems(page)
    const unsolved = unsolvedIndices(puzzleItems)
    if (unsolved.length === 0) return
    await dragItemToIndex(page, unsolved[0], unsolved[unsolved.length-1])
    
  }

}

function unsolvedIndices(items: PuzzleItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .filter(x => x.item.state !== "correct")
    .map(x => x.index)
}