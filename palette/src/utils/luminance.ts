import { Rgb } from '@/utils/Rgb'

export const f = (v: number): number => {
  v = v / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

/**
 * Calculates the luminance from an RGB-value
 * @param rgb
 */
export const luminance = (rgb: Rgb): number => {
  const { r, g, b } = rgb
  return f(r) * 0.2126 + f(g) * 0.7152 + f(b) * 0.0722
}
