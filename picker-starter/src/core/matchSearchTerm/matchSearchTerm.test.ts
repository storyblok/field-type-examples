import { matchSearchTerm } from './matchSearchTerm'
import { BasketItem } from '../'

const templateItem: BasketItem = {
  type: 'item',
  id: '123',
  description: undefined,
  image: undefined,
  name: '',
}

describe('matchSearchTerm', () => {
  it('should search the name', () => {
    expect(
      matchSearchTerm('gorilla')({
        ...templateItem,
        name: 'gorilla',
      }),
    ).toBeTruthy()
  })
  it('should search the description', () => {
    expect(
      matchSearchTerm('gorilla')({
        ...templateItem,
        description: 'gorilla',
      }),
    ).toBeTruthy()
  })
  it('should be case insensitive', () => {
    expect(
      matchSearchTerm('gorilla')({
        ...templateItem,
        name: 'Gorilla',
      }),
    ).toBeTruthy()
  })
  it('should not match', () => {
    expect(
      matchSearchTerm('gorilla')({
        ...templateItem,
      }),
    ).toBeFalsy()
  })
  test('that empty strings match all', () => {
    expect(
      matchSearchTerm('')({
        ...templateItem,
      }),
    ).toBeTruthy()
  })
})
