import { HighlightState } from './CodeEditorContent'
import { nextHighlightState } from './nextHighlightState'
import { HighlightStateOptions } from '../../Options'

/**
 * Toggles an  index in the array
 * @param highlightStateOptions
 * @param highlightStates a list of line states
 * @param lineNumber the line to toggle
 * @returns a new array where the index at lineNumber has been toggled
 */
export const toggleLine = (
  highlightStateOptions: HighlightStateOptions,
  highlightStates: HighlightState[],
  lineNumber: number,
): HighlightState[] => {
  // .map does not preserve the information that the array has at least one element
  const [first, ...rest] = highlightStateOptions
  const highlightStateValues = [
    first.value,
    ...rest.map((it) => it.value),
  ] satisfies [string, ...string[]]
  return highlightStates.map((state, line) =>
    line === lineNumber
      ? nextHighlightState(highlightStateValues, state)
      : state,
  )
}
