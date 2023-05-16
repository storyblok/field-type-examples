import { LineState } from './CodeEditorContent'
import { nextLineState } from './nextLineState'

/**
 * Toggles an  index in the array
 * @param lineStates a list of line states
 * @param lineNumber the line to toggle
 * @returns a new array where the index at lineNumber has been toggled
 */
export const toggleLine = (
  lineStates: LineState[],
  lineNumber: number,
): LineState[] =>
  lineStates.map((state, line) =>
    line === lineNumber ? nextLineState(state) : state,
  )
