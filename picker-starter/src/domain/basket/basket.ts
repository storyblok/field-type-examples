import { BasketItem } from './BasketItem'

export type Basket = Readonly<{
  items: ReadonlyArray<BasketItem>
  contains: (item: BasketItem) => boolean
  addItem: (item: BasketItem) => void
  remove: (item: BasketItem) => void
  clear: () => void
  set: (items: BasketItem[]) => void
  size: () => number
  isEmpty: () => boolean
}>

type SetItems = (getItems: (current: BasketItem[]) => BasketItem[]) => void

/**
 * Provides a set of operations to mutate the state of list of items.
 * The list that is provided as argument is never mutated, and the function does not create a state.
 * The state needs to be stored outside this function's scope, and the mutation is done with the setState argument.
 * @param items
 * @param setItems
 */
export const createBasket = (
  items: BasketItem[],
  setItems: SetItems,
): Basket => {
  return {
    items,
    isEmpty() {
      return items.length === 0
    },
    contains(item: BasketItem) {
      return items.some((it) => it.id === item.id)
    },
    set(items: BasketItem[]) {
      setItems(() => items)
    },
    addItem: (item) => setItems((items) => [...items, item]),
    remove(item: BasketItem) {
      setItems((items) => items.filter((it) => it.id !== item.id))
    },
    clear() {
      setItems(() => [])
    },
    size() {
      return items.length
    },
  }
}
