import { LineState, lineStates } from './CodeEditorContent'

export const nextLineState = (currentState: LineState): LineState =>
  lineStates[lineStates.indexOf(currentState) + 1] ?? ''
