import { LineState } from './CodeEditorContent'
import { unique } from '../../utils/unique'

/**
 * Rotates a given lineState to the next state.
 *  For example, when the user clicks on a line which is "+", it rotates to "-".
 *  If they click again, it goes back to "".
 * @param currentState
 * @param lineStateValues
 */
export const nextLineState = (
  lineStateValues: [string, ...string[]],
  currentState: string,
): LineState => {
  const defaultValue = lineStateValues[0]
  const uniqueLineStateValues = unique(lineStateValues) ?? defaultValue
  return (
    uniqueLineStateValues[
      (uniqueLineStateValues.indexOf(currentState) + 1) %
        uniqueLineStateValues.length
    ] ?? defaultValue
  )
}
