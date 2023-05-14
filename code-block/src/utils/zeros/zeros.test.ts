import { zeros } from './zeros'

describe('zeros', () => {
  it('can create empty arrays', () => {
    expect(zeros(0)).toEqual([])
  })
  it('creates arrays of variable lengths', () => {
    expect(zeros(0)).toHaveLength(0)
    expect(zeros(1)).toHaveLength(1)
    expect(zeros(5)).toHaveLength(5)
    expect(zeros(10)).toHaveLength(10)
    expect(zeros(512)).toHaveLength(512)
  })
  test('that the arrays contain zeros', () => {
    expect(zeros(1)).toEqual([0])
    expect(zeros(2)).toEqual([0, 0])
    expect(zeros(3)).toEqual([0, 0, 0])
    expect(zeros(10)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
  it('throws exceptions for array length of floating decimal point', () => {
    expect(() => zeros(234.34)).toThrow()
  })
  it('throws exceptions for array length of negative numbers', () => {
    expect(() => zeros(-1)).toThrow()
  })
})
