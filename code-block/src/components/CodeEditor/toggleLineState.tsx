import { LineState, lineStates } from './CodeEditorContent'

export const toggleLineState = (currentState: LineState): LineState =>
  lineStates[lineStates.indexOf(currentState) + 1] ?? 'default'
