import { unsafeHash } from '../unsafeHash'

/**
 * Min = 0
 * @param seed
 * @param max
 */
export const pseudoRandom = (seed: string, max: number): number => {
  return Math.abs(unsafeHash(seed)) % (max + 1)
}
