/**
 * Calculates the contrast ratio between two relative luminances  based on the Web Content Accessibility Guidelines (WCAG) 2.1 (https://www.w3.org/TR/WCAG/#dfn-contrast-ratio)
 * The result is a value between 0 and 1.
 * @param relativeLuminance1
 * @param relativeLuminance2
 */
export const contrastRatio = (
  relativeLuminance1: number,
  relativeLuminance2: number,
): number => {
  return relativeLuminance1 > relativeLuminance2
    ? (relativeLuminance1 + 0.05) / (relativeLuminance2 + 0.05)
    : (relativeLuminance2 + 0.05) / (relativeLuminance1 + 0.05)
}
