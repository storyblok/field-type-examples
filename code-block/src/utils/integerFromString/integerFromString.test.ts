import { integerFromString } from './integerFromString'

describe('numberFromString', () => {
  it('should parse natural numbers', () => {
    expect(integerFromString('123')).toEqual(123)
  })
  it('parses integers', () => {
    expect(integerFromString('123')).toEqual(123)
  })
  it('parses negative integers', () => {
    expect(integerFromString('-123')).toEqual(-123)
  })
  it('should not parse floating numbers', () => {
    expect(integerFromString('1.5')).toBeUndefined()
  })
  it('should not return infinity for large numbers', () => {
    const googolStr = `1${new Array(1000).fill(0).join('')}`
    expect(integerFromString(googolStr)).toBeUndefined()
  })
  it('should not return infinity for small numbers', () => {
    const googolStr = `-1${new Array(1000).fill(0).join('')}`
    expect(integerFromString(googolStr)).toBeUndefined()
  })
  it('parses hexadecimal values', () => {
    expect(integerFromString('0xFF')).toBe(255)
    expect(integerFromString('0x00')).toBe(0)
    expect(integerFromString('0x0')).toBe(0)
    expect(integerFromString('0x80')).toBe(128)
  })
  test('empty strings', () => {
    expect(integerFromString('')).toBeUndefined()
  })
  describe('malformatted numbers', () => {
    test('string with whitespace', () => {
      expect(integerFromString(' ')).toBeUndefined()
      expect(integerFromString('\r')).toBeUndefined()
      expect(integerFromString('\n')).toBeUndefined()
      expect(integerFromString('\n\r ')).toBeUndefined()
    })
    test('string with number and whitespace', () => {
      expect(integerFromString('1 ')).toBeUndefined()
      expect(integerFromString(' 1')).toBeUndefined()
      expect(integerFromString(' 1 ')).toBeUndefined()
      expect(integerFromString('\r 1')).toBeUndefined()
      expect(integerFromString('\n 1')).toBeUndefined()
      expect(integerFromString('\n\r 1')).toBeUndefined()
    })
    test('fractions', () => {
      expect(integerFromString('1/2')).toBeUndefined()
    })
    test('text followed by numbers', () => {
      expect(integerFromString('hello123')).toBeUndefined()
    })
    test('numbers followed by text', () => {
      expect(integerFromString('123hello')).toBeUndefined()
    })
    test('numbers in text', () => {
      expect(integerFromString('hello123hello')).toBeUndefined()
    })
    test('text', () => {
      expect(integerFromString('hello')).toBeUndefined()
    })
  })
})
