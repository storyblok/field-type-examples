/**
 * Use instead of parseInt
 */
export const numberFromString = (str: string): number | undefined => {
  const parsed = Number(str)
  return !isNaN(parsed) && isFinite(parsed) ? parsed : undefined
}
