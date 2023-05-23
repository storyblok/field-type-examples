/**
 * Parses an integer from a string without any suprises. Strings that describe numbers without any other characters yield
 * `number`. All other combination of characters yield `undefined`.
 */
export const integerFromString = (str: string): number | undefined => {
  const parsed = Number(str)
  return str !== '' &&
    !hasWhiteSpace(str) &&
    isInt(parsed) &&
    !isNaN(parsed) &&
    isFinite(parsed)
    ? parsed
    : undefined
}

const isInt = (n: number): boolean => Number(n) === n && n % 1 === 0

/**
 * @param str
 * @returns `true` if any character is a whitespace.
 */
const hasWhiteSpace = (str: string): boolean => {
  return /\s+/.test(str)
}
