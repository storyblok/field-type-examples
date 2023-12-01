import { numberFromString } from './numberFromString'

describe('numberFromString', () => {
  it('should parse natural numbers', () => {
    expect(numberFromString('123')).toEqual(123)
  })
  it('should parse integers', () => {
    expect(numberFromString('123')).toEqual(123)
    expect(numberFromString('-123')).toEqual(-123)
  })
  it('should parse floating numbers', () => {
    const parsed = numberFromString('1.5')
    const epsilon = 1e-3
    expect(parsed).toBeLessThanOrEqual(1.5 + epsilon)
    expect(parsed).toBeGreaterThanOrEqual(1.5 - epsilon)
  })
  it('should not return infinity for large numbers', () => {
    const googolStr = `1${new Array(1000).fill(0).join('')}`
    expect(numberFromString(googolStr)).toBeUndefined()
  })
  it('should not return infinity for small numbers', () => {
    const googolStr = `-1${new Array(1000).fill(0).join('')}`
    expect(numberFromString(googolStr)).toBeUndefined()
  })
  describe('malformatted numbers', () => {
    test('fractions', () => {
      expect(numberFromString('1/2')).toBeUndefined()
    })
    test('text followed by numbers', () => {
      expect(numberFromString('hello123')).toBeUndefined()
    })
    test('numbers followed by text', () => {
      expect(numberFromString('123hello')).toBeUndefined()
    })
    test('numbers in text', () => {
      expect(numberFromString('hello123hello')).toBeUndefined()
    })
    test('text', () => {
      expect(numberFromString('hello')).toBeUndefined()
    })
  })
})
