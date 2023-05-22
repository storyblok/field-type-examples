import { HighlightState } from './CodeEditorContent'
import { unique } from '../../utils'

/**
 * Rotates a given highlightState to the next state.
 *  For example, when the user clicks on a line which is "+", it rotates to "-".
 *  If they click again, it goes back to "".
 * @param currentState
 * @param highlightStateValues
 */
export const nextHighlightState = (
  highlightStateValues: [string, ...string[]],
  currentState: string,
): HighlightState => {
  const defaultValue = highlightStateValues[0]
  const uniqueHighlightStateValues =
    unique(highlightStateValues) ?? defaultValue
  return (
    uniqueHighlightStateValues[
      (uniqueHighlightStateValues.indexOf(currentState) + 1) %
        uniqueHighlightStateValues.length
    ] ?? defaultValue
  )
}
