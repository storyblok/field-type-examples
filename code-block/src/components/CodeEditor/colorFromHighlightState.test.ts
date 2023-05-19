import { colorFromHighlightState } from './colorFromHighlightState'

describe('colorFromHighlightState', () => {
  it('falls back to the default color when the value is not found in the array', () => {
    expect(colorFromHighlightState([{ value: '', color: 'red' }], 'blah')).toBe(
      'red',
    )
  })
  it('finds the color', () => {
    expect(
      colorFromHighlightState(
        [
          { value: '', color: 'red' },
          { value: 'pear', color: '#0F0' },
        ],
        'pear',
      ),
    ).toBe('#0F0')
  })
  it('picks the first options when there is ambiguity', () => {
    expect(
      colorFromHighlightState(
        [
          { value: '', color: 'red' },
          { value: 'pear', color: '#0F0' },
          { value: 'pear', color: '#AFA' },
        ],
        'pear',
      ),
    ).toBe('#0F0')
  })
})
