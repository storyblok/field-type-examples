import { defaultLineStateValue, LineState } from './CodeEditorContent'

/**
 * Rotates a given lineState to the next state.
 *  For example, when the user clicks on a line which is "+", it rotates to "-".
 *  If they click again, it goes back to "".
 * @param currentState
 * @param lineStateValues
 */
export const nextLineState = (
  lineStateValues: string[],
  currentState: string,
): LineState =>
  lineStateValues[lineStateValues.indexOf(currentState) + 1] ??
  defaultLineStateValue
