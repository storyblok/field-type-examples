import { move } from './move'

describe('move', () => {
  it('does not mutate the input', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    move(array, 0, 1)
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6])
  })
  it('returns a new array if it was rearranged', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(move(array, 0, 1)).not.toBe(array)
  })
  it('returns the same array if any of the indices are out of bounds', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(move(array, -1, 1)).toEqual(array)
    expect(move(array, 100, 1)).toEqual(array)
    expect(move(array, 0, 100)).toEqual(array)
  })
  it('moves the only item in an arrays to the same place', () => {
    expect(move([0], 0, 0)).toEqual([0])
  })
  it('can swaps places for arrays with only two elements ', () => {
    expect(move([0, 1], 0, 1)).toEqual([1, 0])
  })
  it('can swap adjacent elements at the start of an array', () => {
    expect(move([0, 1, 2, 3], 0, 1)).toEqual([1, 0, 2, 3])
  })
  it('can swap adjacent elements at the end of an array', () => {
    expect(move([0, 1, 2, 3], 2, 3)).toEqual([0, 1, 3, 2])
  })
  it('can swap adjacent element places in the middle of the the array', () => {
    expect(move([0, 1, 2, 3], 1, 2)).toEqual([0, 2, 1, 3])
  })
  it('can move an element to the end of an array', () => {
    expect(move([0, 1, 2, 3], 0, 3)).toEqual([1, 2, 3, 0])
    expect(move([0, 1, 2, 3], 1, 3)).toEqual([0, 2, 3, 1])
    expect(move([0, 1, 2, 3], 2, 3)).toEqual([0, 1, 3, 2])
  })
  it('can move an element to the beginning of an array', () => {
    expect(move([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 2, 3])
    expect(move([0, 1, 2, 3], 2, 0)).toEqual([2, 0, 1, 3])
    expect(move([0, 1, 2, 3], 3, 0)).toEqual([3, 0, 1, 2])
  })
  it('moves places of two items where one is undefined', () => {
    // This is to ensure that we don't accidentally check index out of bounds with items[index],
    //  because undefined is allowed to be in the array
    expect(move([undefined, 1], 0, 1)).toEqual([1, undefined])
  })
  it('returns the same array if the indices are equal', () => {
    const array = [0, 1, 2, 3, 4, 5, 6]
    expect(move(array, 0, 0)).toEqual(array)
    expect(move(array, 1, 1)).toEqual(array)
    expect(move(array, 3, 3)).toEqual(array)
    expect(move(array, 5, 5)).toEqual(array)
  })
})
