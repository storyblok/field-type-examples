export const move = <T>(
  items: T[],
  fromIndex: number,
  toIndex: number,
): T[] => {
  if (fromIndex === toIndex) {
    return items
  }

  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex > items.length - 1 ||
    toIndex > items.length - 1
  ) {
    return items
  }

  const item = items[fromIndex] as T

  const arrayWithout = [
    ...items.slice(0, fromIndex),
    ...items.slice(fromIndex + 1),
  ]

  return [
    ...arrayWithout.slice(0, toIndex),
    item,
    ...arrayWithout.slice(toIndex),
  ]
}
