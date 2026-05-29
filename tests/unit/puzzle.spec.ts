import { describe, it, expect } from 'vitest'
import { getItemStatus, shuffleItems, countCorrectItems } from '@/utils/puzzle'
import { DatasetItem } from '@/types/data'

describe('getItemStatus', () => {
  const mockItem: DatasetItem = { name: 'Item', order: 1 }

  it('should return default status when no feedback', () => {
    const status = getItemStatus(mockItem, 0, false)
    expect(status).toBe('default')
  })

  it('should return correct when item is in right position', () => {
    const status = getItemStatus(mockItem, 0, true)
    expect(status).toBe('correct')
  })

  it('should return close when item is off by 1 position', () => {
    const item: DatasetItem = { name: 'Item', order: 2 }
    const status = getItemStatus(item, 0, true)
    expect(status).toBe('close')
  })

  it('should return close when item is off by 2 positions', () => {
    const item: DatasetItem = { name: 'Item', order: 3 }
    const status = getItemStatus(item, 0, true)
    expect(status).toBe('close')
  })

  it('should return wrong when item is off by more than 2 positions', () => {
    const item: DatasetItem = { name: 'Item', order: 5 }
    const status = getItemStatus(item, 0, true)
    expect(status).toBe('wrong')
  })

  it('should handle items at different indices', () => {
    const item: DatasetItem = { name: 'Item', order: 5 }
    // At index 1, order 5 would be off by |5 - 2| = 3
    const status = getItemStatus(item, 1, true)
    expect(status).toBe('wrong')
  })
})

describe('shuffleItems', () => {
  it('should return an array of same length', () => {
    const items: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const shuffled = shuffleItems(items)
    expect(shuffled).toHaveLength(3)
  })

  it('should contain all original items', () => {
    const items: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const shuffled = shuffleItems(items)
    const names = shuffled.map(i => i.name).sort()
    expect(names).toEqual(['A', 'B', 'C'])
  })

  it('should not modify original array', () => {
    const items: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
    ]
    const original = [...items]
    shuffleItems(items)
    expect(items).toEqual(original)
  })

  it('should handle empty array', () => {
    const items: DatasetItem[] = []
    const shuffled = shuffleItems(items)
    expect(shuffled).toHaveLength(0)
  })

  it('should handle single item', () => {
    const items: DatasetItem[] = [{ name: 'A', order: 1 }]
    const shuffled = shuffleItems(items)
    expect(shuffled).toHaveLength(1)
    expect(shuffled[0]).toEqual(items[0])
  })
})

describe('countCorrectItems', () => {
  it('should count all correct items', () => {
    const shuffled: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const correct: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const count = countCorrectItems(shuffled, correct)
    expect(count).toBe(3)
  })

  it('should count no correct items', () => {
    const shuffled: DatasetItem[] = [
      { name: 'C', order: 3 },
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
    ]
    const correct: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const count = countCorrectItems(shuffled, correct)
    expect(count).toBe(0)
  })

  it('should count partial correct items', () => {
    const shuffled: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'C', order: 3 },
      { name: 'B', order: 2 },
    ]
    const correct: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const count = countCorrectItems(shuffled, correct)
    expect(count).toBe(1)
  })

  it('should handle empty arrays', () => {
    const count = countCorrectItems([], [])
    expect(count).toBe(0)
  })
})
