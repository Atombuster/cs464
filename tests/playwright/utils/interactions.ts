import { Page } from '@playwright/test'

import { ItemStatus } from "../../../src/types/state"

import { pause } from "./pause"

const DRAG_PAUSE = 100

export type PuzzleItem = {
  label: string
  state: ItemStatus
}

export async function clickButtonByText(page: Page, text: string) {
  await page.getByRole('button', { name: text }).click()
  await pause(DRAG_PAUSE)
}

export async function getPuzzleItems(page: Page): Promise<PuzzleItem[]> {
  const cards = page.locator('[data-state]')

  const count = await cards.count()

  const result: PuzzleItem[] = []

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i)

    const label = await card.locator('p').innerText()
    const state = (await card.getAttribute('data-state')) as ItemStatus

    result.push({ label, state })
  }

  return result
}


export async function dragItemToIndex(page: Page, fromIndex: number, toIndex: number) {
  const items = page.locator('[data-state]')

  const from = items.nth(fromIndex)
  const to = items.nth(toIndex)

  await from.scrollIntoViewIfNeeded()
  await to.scrollIntoViewIfNeeded()

  const fromBox = await from.boundingBox()
  const toBox = await to.boundingBox()

  if (!fromBox || !toBox) throw new Error('Missing bounding box')

  await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2)
  await page.mouse.down()

  await page.mouse.move(
    toBox.x + toBox.width / 2,
    toBox.y + toBox.height / 2,
    { steps: 25 }
  )

  await page.mouse.up()
  await pause(DRAG_PAUSE)
}


export async function isPuzzleSolved(page: Page): Promise<boolean> {
  const winMessage = page.getByText('Correct! You solved the puzzle.')

  return await winMessage.isVisible().catch(() => false)
}