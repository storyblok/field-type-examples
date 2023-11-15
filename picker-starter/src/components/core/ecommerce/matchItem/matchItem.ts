import { BasketItem } from '../'

const stringContains = (search_term: string) => (text: string | undefined) =>
  typeof text === 'string' && new RegExp(search_term, 'gi').test(text)

/**
 * Searches an item for a text occurrence. Case-insensitive.
 * @param search_term
 * @returns true if the item contains the text
 */
export const matchItem =
  (search_term: string) =>
  (item: BasketItem): boolean => {
    const containsSearchTerm = stringContains(search_term)
    return containsSearchTerm(item.name) || containsSearchTerm(item.description)
  }
