export const addItemsLabel = (maxCount: number | undefined): string => {
  return maxCount === 1 ? 'Add an item' : 'Add items'
}
