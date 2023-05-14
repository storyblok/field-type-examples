import {LineState} from "./CodeEditorContent";

const lineClasses: Record<LineState, string> = {
  default: 'lineStyle-default',
  neutral: 'lineStyle-neutral',
  add: 'lineStyle-add',
  remove: 'lineStyle-remove',
}
const allClasses = Object.values(lineClasses)
const lineClass = (lineState: LineState): string => {
  return lineClasses[lineState]
}
const lineSelector = 'CodeMirror-line'
const clearStyles = (
  editor: CodeMirror.Editor,
  highlightedLines: LineState[],
) => {
  highlightedLines.forEach((state, line) => {
    allClasses.forEach((className) => {
      editor.removeLineClass(line, lineSelector, className)
    })
  })
}
const applyStyles = (
  editor: CodeMirror.Editor,
  highlightedLines: LineState[],
) => {
  highlightedLines.forEach((state, line) => {
    editor.addLineClass(line, lineSelector, lineClass(state))
  })
}
export const highlightLines = (
  editor: CodeMirror.Editor,
  highlightedLines: LineState[],
) => {
  clearStyles(editor, highlightedLines)
  applyStyles(editor, highlightedLines)
}