import {FunctionComponent, useEffect, useRef} from 'react'
import {
  EditorDidConfigure,
  OnBeforeChange, OnGutterClick,
  SyncedCodeMirror,
} from '../SyncedCodeMirror'

import styles from './CodeEditor.module.scss'
import './storyblok-theme.scss'
import {CodeEditorContent, LineState, lineState} from "./CodeEditorContent";
import {zeros} from "../../utils";
import {toggleLineState} from "./toggleLineState";


const lineSelector = 'CodeMirror-line'

const lineClasses: Record<LineState, string> = {
  default: 'lineStyle-default',
  neutral: 'lineStyle-neutral',
  add: 'lineStyle-add',
  remove: 'lineStyle-remove',
}

const allClasses = Object.values(lineClasses)

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
}> = (props) => {
  const editor = useRef<CodeMirror.Editor>()

  const { content, setContent } = props
  const { code, highlightedLines } = content

  const setCode = (value: CodeEditorContent['code']) =>
    setContent({
      ...content,
      code: value,
    })
  const setHighlightedLines = (value: CodeEditorContent['highlightedLines']) =>
    setContent({
      ...content,
      highlightedLines: value,
    })

  const onBeforeChange: OnBeforeChange = (editor, data, value) => setCode(value)
  const onGutterClick: OnGutterClick = (editor, lineNumber) => {
    setHighlightedLines(
      zeros(editor.lineCount()).map((_, line) =>
        line === lineNumber
          ? toggleLineState(lineState(highlightedLines[line]))
          : lineState(highlightedLines[line]),
      ),
    )
  }
  const editorDidConfigure: EditorDidConfigure = (e) => {
    editor.current = e
  }
  useEffect(() => {
    if (!editor.current) {
      return
    }
    zeros(editor.current.lineCount()).forEach((_, line) => {
      // Clear all styles
      allClasses.forEach((className) => {
        editor.current?.removeLineClass(line, lineSelector, className)
      })
      // Set the styles for the row
      editor.current?.addLineClass(
        line,
        lineSelector,
        lineClasses[lineState(highlightedLines[line])],
      )
    })
  }, [highlightedLines, code])

  return (
    <SyncedCodeMirror
      className={styles.codeEditor}
      options={{
        theme: 'storyblok',
        lineNumbers: true,
        indentWithTabs: false,
        tabSize: 2,
      }}
      value={code}
      onBeforeChange={onBeforeChange}
      onGutterClick={onGutterClick}
      editorDidConfigure={editorDidConfigure}
    />
  )
}

