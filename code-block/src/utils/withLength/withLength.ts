import { zeros } from '../../utils'

/**
 * Given an array a new length, returns
 *  1. the _same_ array if the length match,
 *  2. trims the array from the tail if the array is too long,
 *  3. adds new items to the tail to the array if the array is too short
 * @param lineStates
 * @param itemCount
 * @param fillWith
 */
export const withLength = <T>(
  lineStates: T[],
  itemCount: number,
  fillWith: T,
) => {
  const lineCountDiff = itemCount - lineStates.length
  if (lineCountDiff > 0) {
    // lines were added -> append
    return [...lineStates, ...zeros(lineCountDiff).map(() => fillWith)]
  }
  if (lineCountDiff < 0) {
    // lines were removed -> trim
    return lineStates.slice(0, itemCount)
  }
  // no lines were added or removed -> preserve reference
  return lineStates
}
