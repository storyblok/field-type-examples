/**
 * Use instead of parseInt
 */
export const numberFromString = (str: string): number | undefined => {
  // eslint-disable-next-line no-restricted-syntax
  const parsed = Number(str)
  return str !== '' && !hasWhiteSpace(str) && !isNaN(parsed) && isFinite(parsed)
    ? parsed
    : undefined
}

const hasWhiteSpace = (str: string): boolean => {
  return /\s+/.test(str)
}
