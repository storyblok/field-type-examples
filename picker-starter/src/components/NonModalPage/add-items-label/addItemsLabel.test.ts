import { addItemsLabel } from './addItemsLabel'

describe('addedItemsLabel', () => {
  it('should use the correct grammatical number', () => {
    expect(addItemsLabel(undefined)).toMatch(/items$/)
    expect(addItemsLabel(0)).toMatch(/items$/)
    expect(addItemsLabel(1)).toMatch(/item$/)
    expect(addItemsLabel(2)).toMatch(/items$/)
    expect(addItemsLabel(3)).toMatch(/items$/)
  })
  it.todo('test NaN')
})
