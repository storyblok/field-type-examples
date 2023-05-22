import { nextHighlightState } from './nextHighlightState'

describe('nextHighlightState', () => {
  it('returns the same element when the array has length 1', () => {
    expect(nextHighlightState(['1'], '')).toEqual('1')
  })
  it('returns the next element when the array has length > 1', () => {
    expect(nextHighlightState(['1', '2'], '0')).toEqual('1')
    expect(nextHighlightState(['1', '2', '3', '4'], '2')).toBe('3')
  })
  it('returns to the first index when the state is at the last place in the array', () => {
    expect(nextHighlightState(['0', '1'], '1')).toEqual('0')
  })
  it('returns the first element when the current state does not exist in the array', () => {
    expect(nextHighlightState(['0', '1'], 'abc')).toEqual('0')
  })
  it('ignores duplicate values', () => {
    expect(nextHighlightState(['0', '0', '1'], '0')).toEqual('1')
    expect(nextHighlightState(['0', '0', '1', '1'], '1')).toEqual('0')
  })
})
