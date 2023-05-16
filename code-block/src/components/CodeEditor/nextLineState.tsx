import { LineState, lineStates } from './CodeEditorContent'

/**
 * Rotates a given lineState to the next state.
 *  For example, when the user clicks on a line which is "+", it rotates to "-".
 *  If they click again, it goes back to "".
 * @param currentState
 */
export const nextLineState = (currentState: LineState): LineState =>
  lineStates[lineStates.indexOf(currentState) + 1] ?? ''
