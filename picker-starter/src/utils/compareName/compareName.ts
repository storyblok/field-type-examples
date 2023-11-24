import { BasketItem } from '@/domain'

export const compareName = <Item extends BasketItem>(
  a: Item,
  b: Item,
): number => a.name.localeCompare(b.name)
