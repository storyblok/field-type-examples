/**
 * Use instead of parseInt
 */
export const numberFromString = (str: string): number | undefined => {
  // eslint-disable-next-line no-restricted-syntax
  const parsed = Number(str)
  return !isNaN(parsed) && isFinite(parsed) ? parsed : undefined
}
