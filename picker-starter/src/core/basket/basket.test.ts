import { createBasket } from './basket'
import { BasketItem } from '@/core'

const testBasket = (initialItems: BasketItem[] = []) => {
  let items = [...initialItems]
  return createBasket(items, (getItems) => {
    items = getItems(items)
  })
}

const mockItem: BasketItem = {
  type: 'mock-item',
  id: 'mock-item-1',
  image: undefined,
  name: 'mock item',
  description: undefined,
}

describe('', () => {
  it('should initialize from existing array', () => {
    expect(testBasket([]).size()).toEqual(0)
    expect(testBasket([mockItem]).size()).toEqual(1)
  })
  it('should add items', () => {
    let itemsState: BasketItem[] = []
    const basket = createBasket(itemsState, (getItems) => {
      itemsState = getItems(itemsState)
    })
    basket.addItem(mockItem)
    expect(basket.items.length).toEqual(0)
    expect(itemsState.length).toEqual(1)
  })
  it('should remove items', () => {
    let itemsState: BasketItem[] = [mockItem]
    const basket = createBasket(itemsState, (getItems) => {
      itemsState = getItems(itemsState)
    })
    basket.remove(mockItem)
    expect(basket.items.length).toEqual(1)
    expect(itemsState.length).toEqual(0)
  })
  it('should clear all items', () => {
    let itemsState: BasketItem[] = [mockItem, mockItem, mockItem]
    const basket = createBasket(itemsState, (getItems) => {
      itemsState = getItems(itemsState)
    })
    basket.clear()
    expect(basket.items.length).toEqual(3)
    expect(itemsState.length).toEqual(0)
  })
  it('should set all items', () => {
    let itemsState: BasketItem[] = []
    const basket = createBasket(itemsState, (getItems) => {
      itemsState = getItems(itemsState)
    })
    basket.set([mockItem, mockItem, mockItem])
    expect(basket.items.length).toEqual(0)
    expect(itemsState.length).toEqual(3)
  })
  it('should give the size', () => {
    let itemsState: BasketItem[] = [mockItem, mockItem]
    const basket = createBasket(itemsState, (getItems) => {
      itemsState = getItems(itemsState)
    })
    expect(basket.size()).toEqual(2)
  })
  describe('isEmpty', () => {
    it('should tell that it is empty', () => {
      let itemsState: BasketItem[] = []
      const basket = createBasket(itemsState, (getItems) => {
        itemsState = getItems(itemsState)
      })
      expect(basket.isEmpty()).toEqual(true)
    })
    it('should tell that it is empty', () => {
      let itemsState: BasketItem[] = [mockItem, mockItem]
      const basket = createBasket(itemsState, (getItems) => {
        itemsState = getItems(itemsState)
      })
      expect(basket.isEmpty()).toEqual(false)
    })
  })
  describe('contains', () => {
    it('should tell that it contains', () => {
      let itemsState: BasketItem[] = [mockItem]
      const basket = createBasket(itemsState, (getItems) => {
        itemsState = getItems(itemsState)
      })
      expect(basket.contains(mockItem)).toEqual(true)
    })
    it('should tell that it is empty', () => {
      let itemsState: BasketItem[] = []
      const basket = createBasket(itemsState, (getItems) => {
        itemsState = getItems(itemsState)
      })
      expect(basket.contains(mockItem)).toEqual(false)
    })
  })
  describe('basket mutation', () => {
    test('that add() does not mutate', () => {
      const basket = testBasket([])
      basket.addItem(mockItem)
      expect(basket.items.length).toEqual(0)
    })
    test('that remove() does not mutate', () => {
      const basket = testBasket([mockItem])
      basket.remove(mockItem)
      expect(basket.items.length).toEqual(1)
    })
    test('that set() does not mutate', () => {
      const basket = testBasket([])
      basket.set([mockItem, mockItem])
      expect(basket.items.length).toEqual(0)
    })
    test('that clear() does not mutate', () => {
      const basket = testBasket([mockItem, mockItem])
      basket.clear()
      expect(basket.items.length).toEqual(2)
    })
  })
})
