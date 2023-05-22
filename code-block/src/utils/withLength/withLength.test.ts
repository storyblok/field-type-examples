import { withLength } from './withLength'

describe('withLength', () => {
  it('returns the same array when the length is expected, reserving the reference', () => {
    const arr = [1, 2, 3, 4]
    expect(withLength(arr, 4, 123)).toBe(arr)
  })
  it('appends', () => {
    const arr = [1, 2]
    expect(withLength(arr, 4, 1)).toEqual([...arr, 1, 1])
  })
  it('trims from the tail', () => {
    const arr = [1, 2, 3, 4]
    expect(withLength(arr, 2, 1)).toEqual([1, 2])
  })
})
