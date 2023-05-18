import { toggleLine } from './toggleLine'
import { LineState } from './CodeEditorContent'
import { nextLineState } from './nextLineState'

describe('toggleLine', () => {
  it('returns an identical array when the index is out of bounds', () => {
    const arr = [''] satisfies LineState[]
    expect(toggleLine(arr, -1)).toEqual(arr)
    expect(toggleLine(arr, 2)).toEqual(arr)
  })
  it('toggles the indicated line', () => {
    expect(toggleLine(['', '', '', ''], 2)).toEqual([
      '',
      '',
      nextLineState(''),
      '',
    ])
  })
  it('toggles all states', () => {
    expect(toggleLine([''], 0)).toEqual([nextLineState('')])
    expect(toggleLine(['0'], 0)).toEqual([nextLineState('0')])
    expect(toggleLine(['+'], 0)).toEqual([nextLineState('+')])
    expect(toggleLine(['-'], 0)).toEqual([nextLineState('-')])
  })
})
