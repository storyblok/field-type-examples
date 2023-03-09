import { relativeLuminance, SRGB } from '@/utils'

const black: SRGB = {
  r: 0,
  g: 0,
  b: 0,
}
const white: SRGB = {
  r: 1,
  g: 1,
  b: 1,
}
const red: SRGB = {
  r: 1,
  g: 0,
  b: 0,
}

describe('relativeLuminance', () => {
  test('that the relative luminance of black is 0', () => {
    expect(relativeLuminance(black)).toBeCloseTo(0, 1)
  })
  test('that the relative luminance of white is 1', () => {
    expect(relativeLuminance(white)).toBeCloseTo(1, 1)
  })
  test('that the relative luminance of red is 0.2126', () => {
    // Hand-calculated
    expect(relativeLuminance(red)).toBeCloseTo(0.2126, 1)
  })
})
