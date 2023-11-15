export const addItemsLabel = (maxCount: number | undefined): string => {
  const singular = maxCount === 1
  return singular ? 'Add an item' : 'Add items'
}
