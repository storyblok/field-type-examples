import { toggleLine } from './toggleLine'
import { LineState } from './CodeEditorContent'
import { nextLineState } from './nextLineState'
import { LineStateOptions } from '../../Options'

const lineStateOptions = [
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
] satisfies LineStateOptions

describe('toggleLine', () => {
  it('returns an identical array when the index is out of bounds', () => {
    const arr = ['', '', ''] satisfies LineState[]
    expect(toggleLine(lineStateOptions, arr, -1)).toEqual(arr)
    expect(toggleLine(lineStateOptions, arr, 20)).toEqual(arr)
  })
  it('toggles the indicated line', () => {
    expect(toggleLine(lineStateOptions, ['', '', '', ''], 2)).toEqual([
      '',
      '',
      'a',
      '',
    ])
  })
})
