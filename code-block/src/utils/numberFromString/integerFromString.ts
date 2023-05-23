/**
 * Parses an integer from a string without any suprises. Strings that describe numbers without any other characters yield
 * `number`. All other combination of characters yield `undefined`.
 */
export const integerFromString = (str: string): number | undefined => {
  const parsed = parseInt(str)
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
