import { SRGB } from '@/utils/SRGB'

export const f = (sRGB: number): number =>
  sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)

/**
 * Calculates the luminance from an RGB-value based on the Web Content Accessibility Guidelines (WCAG) 2.1
 * (https://www.w3.org/TR/WCAG/#dfn-relative-luminance)
 * @param rgb
 */
export const relativeLuminance = (rgb: SRGB): number => {
  const { r, g, b } = rgb
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
