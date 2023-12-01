export const addedItemsCountLabel = (
  count: number,
  maxCount: number | undefined,
): string => {
  const singular =
    typeof maxCount === 'undefined' ? count === 1 : maxCount === 1
  const limitLabel =
    typeof maxCount === 'undefined' ? '' : ` of ${maxCount.toString(10)}`
  const itemsLabel = singular ? 'item' : 'items'
  return `Added ${count}${limitLabel} ${itemsLabel}`
}
