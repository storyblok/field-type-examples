import { zeros } from '../../utils'
import { LineState } from './CodeEditorContent'

// todo tests: preserve ref, append, trim
export const withLength = (lineStates: LineState[], lineCount: number) => {
  const lineCountDiff = lineCount - lineStates.length
  if (lineCountDiff > 0) {
    // lines were added -> append
    return [...lineStates, ...zeros(lineCountDiff).map(() => '' as const)]
  }
  if (lineCountDiff < 0) {
    // lines were removed -> trim
    return lineStates.slice(0, lineCount)
  }
  // no lines were added or removed -> preserve reference
  return lineStates
}
