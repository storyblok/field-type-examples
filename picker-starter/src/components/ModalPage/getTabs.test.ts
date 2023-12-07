import { getTabs } from './getTabs'
import { PickerService, TabItem } from '../../core'

const mockItemService: TabItem = {
  query: () =>
    Promise.resolve({
      pageInfo: undefined,
      items: [],
    }),
  label: 'label',
  name: 'mockProducts',
}
const stub: PickerService = {
  tabs: [mockItemService],
}
describe('getTabs', () => {
  it('returns all item services when selectOnly is undefined', () => {
    expect(getTabs(stub, undefined)).toBe(stub.tabs)
  })
  it('returns all item services when selectOnly is an empty string', () => {
    expect(getTabs(stub, '')).toBe(stub.tabs)
  })
  it('returns empty string when selectOnly does not match any item service', () => {
    expect(getTabs(stub, 'willNotMathc')).toEqual([])
  })
  it('returns an array with the item service that matched', () => {
    expect(getTabs(stub, 'mockProducts')).toEqual([mockItemService])
  })
})
