import { isNaturalNumber } from './isNaturalNumber'

describe('isNaturalNumber', () => {
  test('that positive integers gives true', () => {
    expect(isNaturalNumber('123')).toBeTruthy()
  })
  test('that 0 gives true', () => {
    expect(isNaturalNumber('0')).toBeTruthy()
  })
  test('that negative integers gives false', () => {
    expect(isNaturalNumber('-123')).toBeFalsy()
  })
  test('that floating-point numbers gives false', () => {
    expect(isNaturalNumber('-1.23')).toBeFalsy()
  })
  test('that text gives false', () => {
    expect(isNaturalNumber('hello')).toBeFalsy()
  })
  test('that preceding spaces gives false', () => {
    expect(isNaturalNumber(' 12')).toBeFalsy()
  })
  test('that trailing spaces gives false', () => {
    expect(isNaturalNumber('12 ')).toBeFalsy()
  })
})
