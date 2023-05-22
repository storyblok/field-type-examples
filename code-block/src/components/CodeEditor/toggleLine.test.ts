import { toggleLine } from './toggleLine'
import { HighlightState } from './CodeEditorContent'
import { nextHighlightState } from './nextHighlightState'
import { HighlightStateOptions } from '../../Options'

const highlightStateOptions = [
  {
    value: '',
    color: 'transparent',
  },
  {
    value: 'a',
    color: '#0F0',
  },
  {
    value: 'b',
    color: '#FF0',
  },
  {
    value: 'c',
    color: '#00F',
  },
] satisfies HighlightStateOptions

describe('toggleLine', () => {
  it('returns an identical array when the index is out of bounds', () => {
    const arr = ['', '', ''] satisfies HighlightState[]
    expect(toggleLine(highlightStateOptions, arr, -1)).toEqual(arr)
    expect(toggleLine(highlightStateOptions, arr, 20)).toEqual(arr)
  })
  it('toggles the indicated line', () => {
    expect(toggleLine(highlightStateOptions, ['', '', '', ''], 2)).toEqual([
      '',
      '',
      'a',
      '',
    ])
  })
})
