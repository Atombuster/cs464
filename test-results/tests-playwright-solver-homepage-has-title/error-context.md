# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/playwright/solver.spec.ts >> homepage has title
- Location: tests/playwright/solver.spec.ts:6:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - button "Check Order" [active] [ref=e4] [cursor=pointer]: Check Order
      - button "Shuffle" [ref=e5] [cursor=pointer]
      - link "Add New Dataset" [ref=e6] [cursor=pointer]:
        - /url: /add
    - alert [ref=e8]:
      - img [ref=e10]
      - generic [ref=e12]: 6 of 9 items are in the correct position.
    - heading "Planets" [level=4] [ref=e13]
    - paragraph [ref=e14]: Put the planets in order by distance from the sun (closest first).
    - generic [ref=e15]:
      - generic [ref=e18]:
        - img [ref=e19]
        - paragraph [ref=e21]: Mars
      - generic [ref=e24]:
        - img [ref=e25]
        - paragraph [ref=e27]: Venus
      - generic [ref=e30]:
        - img [ref=e31]
        - paragraph [ref=e33]: Earth
      - generic [ref=e36]:
        - img [ref=e37]
        - paragraph [ref=e39]: Saturn
      - generic [ref=e42]:
        - img [ref=e43]
        - paragraph [ref=e45]: Jupiter
      - generic [ref=e48]:
        - img [ref=e49]
        - paragraph [ref=e51]: Mercury
      - generic [ref=e54]:
        - img [ref=e55]
        - paragraph [ref=e57]: Uranus
      - generic [ref=e60]:
        - img [ref=e61]
        - paragraph [ref=e63]: Neptune
      - generic [ref=e66]:
        - img [ref=e67]
        - paragraph [ref=e69]: Pluto
  - button "Open Next.js Dev Tools" [ref=e75] [cursor=pointer]:
    - img [ref=e76]
  - alert [ref=e79]
```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test'
  2  | 
  3  | import { pause } from "./utils/pause"
  4  | import { clickButtonByText, getPuzzleItems, dragItemToIndex, isPuzzleSolved } from "./utils/interactions"
  5  | 
  6  | test('homepage has title', async ({ page }) => {
  7  |   test.setTimeout(300_000) // this sets the timeout to 300 seconds (5 minutes)
  8  | 
  9  |   // This sets the size of the window
  10 |   await page.setViewportSize({ width: 1400, height: 1000 })
  11 | 
  12 |   // Go to the site
  13 |   await page.goto('http://localhost:3000/puzzle/planets')
  14 | 
  15 |   // Clicking this button checks the order.
  16 |   await clickButtonByText(page, "Check Order")
  17 | 
  18 |   await puzzleSolver(page)
  19 | 
  20 |   // Does the page display the solved text?
  21 |   // If your solver works, this test should pass!
  22 |   const solved = await isPuzzleSolved(page)
> 23 |   expect(solved).toBe(true)
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  24 | 
  25 |   await pause(2000)
  26 | })
  27 | 
  28 | async function puzzleSolver(page: Page) {
  29 |   const correctOrder = [
  30 |     "Mercury",
  31 |     "Venus",
  32 |     "Earth",
  33 |     "Mars",
  34 |     "Jupiter",
  35 |     "Saturn",
  36 |     "Uranus",
  37 |     "Neptune",
  38 |   ]
  39 | 
  40 |   const currentOrder = (await getPuzzleItems(page)).map(item => item.label)
  41 | 
  42 |   for (let targetIndex = 0; targetIndex < correctOrder.length; targetIndex++) {
  43 |     const currentIndex = currentOrder.indexOf(correctOrder[targetIndex])
  44 | 
  45 |     if (currentIndex === -1) {
  46 |       throw new Error(`Could not find ${correctOrder[targetIndex]} in the puzzle`)
  47 |     }
  48 | 
  49 |     if (currentIndex === targetIndex) continue
  50 | 
  51 |     await dragItemToIndex(page, currentIndex, targetIndex)
  52 | 
  53 |     const [item] = currentOrder.splice(currentIndex, 1)
  54 |     currentOrder.splice(targetIndex, 0, item)
  55 |   }
  56 | 
  57 |   await clickButtonByText(page, "Check Order")
  58 | }
  59 | 
```