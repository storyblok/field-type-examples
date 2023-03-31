/**
 * Parses a number from a string without any suprises. Strings that describe numbers without any other characters yield
 * `number`. All other combination of characters yield `undefined`.
 */
export const numberFromString = (str: string): number | undefined => {
  // eslint-disable-next-line no-restricted-syntax
  const parsed = Number(str)
  return str !== '' && !hasWhiteSpace(str) && !isNaN(parsed) && isFinite(parsed)
    ? parsed
    : undefined
}

/**
 * @param str
 * @returns `true` if any character is a whitespace.
 */
const hasWhiteSpace = (str: string): boolean => {
  return /\s+/.test(str)
}
