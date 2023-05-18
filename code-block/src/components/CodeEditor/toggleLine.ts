import { LineState } from './CodeEditorContent'
import { nextLineState } from './nextLineState'

/**
 * Toggles an  index in the array
 * @param lineStateValues
 * @param lineStates a list of line states
 * @param lineNumber the line to toggle
 * @returns a new array where the index at lineNumber has been toggled
 */
export const toggleLine = (
  lineStateValues: string[],
  lineStates: LineState[],
  lineNumber: number,
): LineState[] =>
  lineStates.map((state, line) =>
    line === lineNumber ? nextLineState(lineStateValues, state) : state,
  )
