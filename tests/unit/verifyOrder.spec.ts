import { describe, it, expect } from 'vitest'
import { getItemDirections } from '@/lib/verifyOrder'
import { DatasetItem } from '@/types/data'

describe('getItemDirections', () => {
  it('should return empty map for already sorted array', () => {
    const items: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const directions = getItemDirections(items)
    expect(directions.size).toBe(0)
  })

  it('should identify items that need to move up', () => {
    const items: DatasetItem[] = [
      { name: 'B', order: 2 },
      { name: 'A', order: 1 },
      { name: 'C', order: 3 },
    ]
    const directions = getItemDirections(items)
    expect(directions.get(0)).toBe('down')
    expect(directions.get(1)).toBe('up')
  })

  it('should identify items that need to move down', () => {
    const items: DatasetItem[] = [
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
      { name: 'A', order: 1 },
    ]
    const directions = getItemDirections(items)
    expect(directions.get(0)).toBe('down')
    expect(directions.get(1)).toBe('down')
    expect(directions.get(2)).toBe('up')
  })

  it('should handle completely reversed array', () => {
    const items: DatasetItem[] = [
      { name: 'C', order: 3 },
      { name: 'B', order: 2 },
      { name: 'A', order: 1 },
    ]
    const directions = getItemDirections(items)
    expect(directions.get(0)).toBe('down')
    expect(directions.get(1)).toBe(undefined) // B is already in correct position
    expect(directions.get(2)).toBe('up')
  })

  it('should not include items in correct position in map', () => {
    const items: DatasetItem[] = [
      { name: 'A', order: 1 },
      { name: 'B', order: 2 },
      { name: 'C', order: 3 },
    ]
    const directions = getItemDirections(items)
    expect(directions.has(0)).toBe(false)
    expect(directions.has(1)).toBe(false)
    expect(directions.has(2)).toBe(false)
  })

  it('should handle single item', () => {
    const items: DatasetItem[] = [{ name: 'A', order: 1 }]
    const directions = getItemDirections(items)
    expect(directions.size).toBe(0)
  })

  it('should handle two items', () => {
    const items: DatasetItem[] = [
      { name: 'B', order: 2 },
      { name: 'A', order: 1 },
    ]
    const directions = getItemDirections(items)
    expect(directions.get(0)).toBe('down')
    expect(directions.get(1)).toBe('up')
  })
})
