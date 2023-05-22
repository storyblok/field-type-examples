import { LineState } from './CodeEditorContent'
import { nextLineState } from './nextLineState'
import { LineStateOptions } from '../../Options'

/**
 * Toggles an  index in the array
 * @param lineStateOptions
 * @param lineStates a list of line states
 * @param lineNumber the line to toggle
 * @returns a new array where the index at lineNumber has been toggled
 */
export const toggleLine = (
  lineStateOptions: LineStateOptions,
  lineStates: LineState[],
  lineNumber: number,
): LineState[] => {
  // .map does not preserve the information that the array has at least one element
  const [first, ...rest] = lineStateOptions
  const lineStateValues = [
    first.value,
    ...rest.map((it) => it.value),
  ] satisfies [string, ...string[]]
  return lineStates.map((state, line) =>
    line === lineNumber ? nextLineState(lineStateValues, state) : state,
  )
}
