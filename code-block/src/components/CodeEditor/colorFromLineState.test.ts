import { colorFromLineState } from './colorFromLineState'

describe('colorFromLineState', () => {
  it('falls back to the default color when the value is not found in the array', () => {
    expect(colorFromLineState([{ value: '', color: 'red' }], 'blah')).toBe(
      'red',
    )
  })
  it('finds the color', () => {
    expect(
      colorFromLineState(
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
      colorFromLineState(
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
