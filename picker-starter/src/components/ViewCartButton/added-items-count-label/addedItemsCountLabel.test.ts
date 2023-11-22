import { addedItemsCountLabel } from './addedItemsCountLabel'

describe('addedItemsLabel', () => {
  it('should use the correct grammatical number', () => {
    expect(addedItemsCountLabel(1, undefined)).toMatch(/item$/)
    expect(addedItemsCountLabel(2, undefined)).toMatch(/items$/)
    expect(addedItemsCountLabel(0, 0)).toMatch(/items$/)
    expect(addedItemsCountLabel(1, 1)).toMatch(/item$/)
    expect(addedItemsCountLabel(1, 2)).toMatch(/items$/)
  })
  it('should include maxCount when defined', () => {
    expect(addedItemsCountLabel(0, 1)).toMatch(/1 item$/)
    expect(addedItemsCountLabel(0, 2)).toMatch(/2 items$/)
    expect(addedItemsCountLabel(0, 3)).toMatch(/3 items$/)
  })
  it('should exclude maxCount when undefined', () => {
    expect(addedItemsCountLabel(1, undefined)).toMatch(/1 item$/)
    expect(addedItemsCountLabel(2, undefined)).toMatch(/2 items$/)
    expect(addedItemsCountLabel(3, undefined)).toMatch(/3 items$/)
  })
})
