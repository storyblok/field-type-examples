import { SRGB } from '@/utils/SRGB'
import { numberFromString } from '@/utils/numberFromString'

/**
 * Transforms a hexadecimal color into sRGB color space. For example "#FF0080" -> { r: 1, g: 0, b: 0.5}.
 * @param hex
 */
export const hexToSRGB = (hex: string): SRGB | undefined => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const r8bit = numberFromString(`0x${result?.[1]}`)
  const green8bit = numberFromString(`0x${result?.[2]}`)
  const b8bit = numberFromString(`0x${result?.[3]}`)
  if (
    typeof r8bit === 'undefined' ||
    typeof green8bit === 'undefined' ||
    typeof b8bit === 'undefined'
  ) {
    return undefined
  }
  return {
    r: r8bit / 255,
    g: green8bit / 255,
    b: b8bit / 255,
  }
}
