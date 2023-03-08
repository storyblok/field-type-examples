import { Rgb } from '@/utils/Rgb'
import { numberFromString } from '@/utils/numberFromString'

/**
 * Parses a hex color (#FFABC1 for example) to an object.
 * @param hex
 */
export const hexToRgb = (hex: string): Rgb | undefined => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const r = numberFromString(`0x${result?.[1]}`)
  const g = numberFromString(`0x${result?.[2]}`)
  const b = numberFromString(`0x${result?.[3]}`)
  if (
    typeof r === 'undefined' ||
    typeof g === 'undefined' ||
    typeof b === 'undefined'
  ) {
    return undefined
  }
  return { r, g, b }
}
