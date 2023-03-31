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
  it('parses hexadecimal values', () => {
    expect(numberFromString('0xFF')).toBe(255)
    expect(numberFromString('0x00')).toBe(0)
    expect(numberFromString('0x0')).toBe(0)
    expect(numberFromString('0x80')).toBe(128)
  })
  test('empty strings', () => {
    expect(numberFromString('')).toBeUndefined()
  })
  describe('malformatted numbers', () => {
    test('string with whitespace', () => {
      expect(numberFromString(' ')).toBeUndefined()
      expect(numberFromString('\r')).toBeUndefined()
      expect(numberFromString('\n')).toBeUndefined()
      expect(numberFromString('\n\r ')).toBeUndefined()
    })
    test('string with number and whitespace', () => {
      expect(numberFromString('1 ')).toBeUndefined()
      expect(numberFromString(' 1')).toBeUndefined()
      expect(numberFromString(' 1 ')).toBeUndefined()
      expect(numberFromString('\r 1')).toBeUndefined()
      expect(numberFromString('\n 1')).toBeUndefined()
      expect(numberFromString('\n\r 1')).toBeUndefined()
    })
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
