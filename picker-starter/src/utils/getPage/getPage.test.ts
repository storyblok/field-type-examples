import { getPage } from './getPage'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

describe('getPage', () => {
  it('should return the first page', () => {
    expect(getPage(items, 1, 2)).toEqual([1, 2])
  })
  it('should return all items when perPage is large', () => {
    expect(getPage(items, 1, 100)).toEqual(items)
  })
  it('should return an empty array when page is too large', () => {
    expect(getPage(items, 100, 10)).toEqual([])
  })
  it('should return a sliced array on the last page', () => {
    expect(getPage(items, 2, 8)).toEqual([9, 10, 11, 12])
  })
})
