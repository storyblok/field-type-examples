import { BasketItem } from '../'

const stringContains = (searchTerm: string) => (text: string | undefined) =>
  typeof text === 'string' && new RegExp(searchTerm, 'gi').test(text)

/**
 * Searches an item for a text occurrence. Case-insensitive.
 * @param searchTerm
 * @returns true if the item contains the text
 */
export const matchSearchTerm =
  (searchTerm: string) =>
  (item: BasketItem): boolean => {
    const containsSearchTerm = stringContains(searchTerm)
    return containsSearchTerm(item.name) || containsSearchTerm(item.description)
  }
