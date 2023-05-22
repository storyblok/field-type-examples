import { unique } from './unique'

describe('unique()', () => {
  it('should not affect arrays with unique elements', () => {
    expect(unique(['a', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
  })
  it('should remove duplicates', () => {
    expect(unique(['a', 'b', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
  })
  it('should remove triplets', () => {
    expect(unique(['a', 'b', 'b', 'c', 'b'])).toStrictEqual(['a', 'b', 'c'])
  })
  it('should remove many ', () => {
    expect(unique(['a', 'b', 'a', 'b', 'c', 'a', 'b', 'c', 'b'])).toStrictEqual(
      ['a', 'b', 'c'],
    )
  })
})
