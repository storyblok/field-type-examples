import { zeros } from '../../utils'
import {LineState} from "./CodeEditorContent";

// todo tests: preserve ref, append, trim
export const withLength = (lineStates: LineState[], length: number) => {
  const lineDiff = length - lineStates.length
  if (lineDiff > 0) {
    // lines were added -> append
    return [...lineStates, ...zeros(lineDiff).map(() => 'default' as const)]
  }
  if (lineDiff < 0) {
    // lines were removed -> trim
    return lineStates.slice(0, length)
  }
  // no lines were added or removed -> preserve reference
  return lineStates
}
