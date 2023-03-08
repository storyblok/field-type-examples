import { Rgb } from '@/utils/Rgb'
import { luminance } from '@/utils/luminance'

/**
 * Calculates the contrast between two colors as a value between 0 and 1
 * @param color1
 * @param color2
 */
export const colorContrast = (color1: Rgb, color2: Rgb) => {
  const lum1 = luminance(color1)
  const lum2 = luminance(color2)
  return lum1 > lum2
    ? (lum2 + 0.05) / (lum1 + 0.05)
    : (lum1 + 0.05) / (lum2 + 0.05)
}
