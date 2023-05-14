import { toggleLine } from './toggleLine'
import {LineState} from "./CodeEditorContent";
import {nextLineState} from "./nextLineState";

describe('toggleLine', () => {
  it('returns an identical array when the index is out of bounds', () => {
    const arr = ['default'] satisfies LineState[]
    expect(toggleLine(arr, -1)).toEqual(arr)
    expect(toggleLine(arr, 2)).toEqual(arr)
  })
  it('toggles the indicated line', () => {
    expect(toggleLine(['default', 'default', 'default', 'default'], 2)).toEqual(
      ['default', 'default', nextLineState('default'), 'default'],
    )
  })
  it('toggles all states', () => {
    expect(toggleLine(['default'], 0)).toEqual([nextLineState('default')])
    expect(toggleLine(['neutral'], 0)).toEqual([nextLineState('neutral')])
    expect(toggleLine(['add'], 0)).toEqual([nextLineState('add')])
    expect(toggleLine(['remove'], 0)).toEqual([nextLineState('remove')])
  })
})
