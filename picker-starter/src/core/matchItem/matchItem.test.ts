import { matchItem } from './matchItem'
import { BasketItem } from '../'

const templateItem: BasketItem = {
  type: 'item',
  id: '123',
  description: undefined,
  image: undefined,
  name: '',
}

describe('matchItem', () => {
  it('should search the name', () => {
    expect(
      matchItem('gorilla')({
        ...templateItem,
        name: 'gorilla',
      }),
    ).toBeTruthy()
  })
  it('should search the description', () => {
    expect(
      matchItem('gorilla')({
        ...templateItem,
        description: 'gorilla',
      }),
    ).toBeTruthy()
  })
  it('should be case insensitive', () => {
    expect(
      matchItem('gorilla')({
        ...templateItem,
        name: 'Gorilla',
      }),
    ).toBeTruthy()
  })
  it('should not match', () => {
    expect(
      matchItem('gorilla')({
        ...templateItem,
      }),
    ).toBeFalsy()
  })
  test('that empty strings match all', () => {
    expect(
      matchItem('')({
        ...templateItem,
      }),
    ).toBeTruthy()
  })
})
