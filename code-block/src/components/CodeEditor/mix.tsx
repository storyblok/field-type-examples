export const mix = (srgb1: string, srgb2: string, coeff: number) =>
  `color-mix(in srgb, ${srgb1} ${coeff * 100}%, ${srgb2})`
