# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/playwright/solver.spec.ts >> homepage has title
- Location: tests/playwright/solver.spec.ts:8:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/puzzle/planets
Call log:
  - navigating to "http://localhost:3000/puzzle/planets", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: localhost
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test'
  2  | 
  3  | import { pause } from "./utils/pause"
  4  | import { clickButtonByText, getPuzzleItems, dragItemToIndex, isPuzzleSolved } from "./utils/interactions"
  5  | 
  6  | import { PuzzleItem } from "./types/types"
  7  | 
  8  | test('homepage has title', async ({ page }) => {
  9  |   test.setTimeout(300_000) // this sets the timeout to 300 seconds (5 minutes)
  10 | 
  11 |   // This sets the size of the window
  12 |   await page.setViewportSize({ width: 1400, height: 1000 })
  13 | 
  14 |   // Go to the site
> 15 |   await page.goto('http://localhost:3000/puzzle/planets')
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/puzzle/planets
  16 | 
  17 |   // Clicking this button checks the order.
  18 |   await clickButtonByText(page, "Check Order")
  19 | 
  20 |   // TODO: Implement a solver
  21 |   await puzzleSolver(page)
  22 | 
  23 | 
  24 | 
  25 |   // Does the page display the solved text?
  26 |   // If your solver works, this test should pass!
  27 |   const solved = await isPuzzleSolved(page)
  28 |   expect(solved).toBe(true)
  29 | 
  30 |   await pause(2000)
  31 | })
  32 | 
  33 | async function puzzleSolver(page: Page) {
  34 | 
  35 |   await dragItemToIndex(page, 0, 2) // This will drag the 0th index to where the 2nd index currently is
  36 | 
  37 |   // You can use this function to click the "Check Order" button, which will highlight the correct choices.
  38 |   // You can use the functions below to get the solved, unsolved, or close indices 
  39 |   await clickButtonByText(page, "Check Order")
  40 | 
  41 |   return
  42 | 
  43 | }
  44 | 
  45 | function closeIndices(items: PuzzleItem[]) {
  46 |   return items
  47 |     .map((item, index) => ({ item, index }))
  48 |     .filter(x => x.item.state === "close")
  49 |     .map(x => x.index)
  50 | }
  51 | 
  52 | function correctIndices(items: PuzzleItem[]) {
  53 |   return items
  54 |     .map((item, index) => ({ item, index }))
  55 |     .filter(x => x.item.state === "close")
  56 |     .map(x => x.index)
  57 | }
  58 | 
  59 | function wrongIndices(items: PuzzleItem[]) {
  60 |   return items
  61 |     .map((item, index) => ({ item, index }))
  62 |     .filter(x => x.item.state !== "wrong")
  63 |     .map(x => x.index)
  64 | }
  65 | 
  66 | function unsolvedIndices(items: PuzzleItem[]) {
  67 |   return items
  68 |     .map((item, index) => ({ item, index }))
  69 |     .filter(x => x.item.state !== "correct")
  70 |     .map(x => x.index)
  71 | }
```