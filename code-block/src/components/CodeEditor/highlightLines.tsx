import {LineState} from "./CodeEditorContent";

const lineClasses: Record<LineState, string> = {
  default: 'lineStyle-default',
  neutral: 'lineStyle-neutral',
  add: 'lineStyle-add',
  remove: 'lineStyle-remove',
}

const lineSelector = 'CodeMirror-line'

export const highlightLines = (
  editor: CodeMirror.Editor,
  highlightedLines: LineState[],
) => {
  highlightedLines.forEach((lineState, line) => {
    Object.entries(lineClasses).forEach(([state, className]) => {
      if(state === lineState){
        editor.addLineClass(line, lineSelector, className)
      } else {
        editor.removeLineClass(line, lineSelector, className)
      }
    })
  })
}