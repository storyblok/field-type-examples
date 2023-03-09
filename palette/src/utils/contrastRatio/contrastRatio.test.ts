import { contrastRatio } from '@/utils'

describe('contrastRatio', () => {
  test('that the contrast between a luminance and itself is 1', () => {
    expect(contrastRatio(0, 0)).toBeCloseTo(1, 2)
    expect(contrastRatio(0.4, 0.4)).toBeCloseTo(1, 2)
    expect(contrastRatio(1, 1)).toBeCloseTo(1, 2)
  })
  test('that the contrast ratio between black and white is 21:1 -- the highest possible contrast ratio', () => {
    expect(contrastRatio(0, 1)).toBeCloseTo(21, 2)
  })
  test('that the contrast ratio between white and black is 21:1 -- the highest possible contrast ratio', () => {
    expect(contrastRatio(1, 0)).toBeCloseTo(21, 2)
  })
  test('that the contrast ratio is symmetric with respect to the order of the arguments -- the relative luminance of the lighter color is always the dividend', () => {
    expect(contrastRatio(1, 0)).toBe(contrastRatio(0, 1))
    expect(contrastRatio(0.1, 0.7)).toBe(contrastRatio(0.7, 0.1))
  })
  test('that the contrast between 0.6 and 0.3 is 1.8571 -- a hand-calculates value', () => {
    expect(contrastRatio(0.6, 0.3)).toBeCloseTo(1.8571, 2)
  })
})
