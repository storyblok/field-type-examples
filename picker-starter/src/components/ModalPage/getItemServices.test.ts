import { getItemServices } from './getItemServices'
import { PickerService, ItemService } from '../../domain'

const mockItemService: ItemService = {
  query: () =>
    Promise.resolve({
      pageInfo: undefined,
      items: [],
    }),
  label: 'label',
  name: 'mockProducts',
}
const stub: PickerService = {
  itemServices: [mockItemService],
}
describe('getItemServices', () => {
  it('returns all item services when selectOnly is undefined', () => {
    expect(getItemServices(stub, undefined)).toBe(stub.itemServices)
  })
  it('returns all item services when selectOnly is an empty string', () => {
    expect(getItemServices(stub, '')).toBe(stub.itemServices)
  })
  it('returns empty string when selectOnly does not match any item service', () => {
    expect(getItemServices(stub, 'willNotMathc')).toEqual([])
  })
  it('returns an array with the item service that matched', () => {
    expect(getItemServices(stub, 'mockProducts')).toEqual([mockItemService])
  })
})
