import {FunctionComponent, useCallback, useEffect, useRef} from 'react'
import {EditorDidConfigure, OnBeforeChange, OnGutterClick, ControlledCodeMirror,} from '../ControlledCodeMirror'
import styles from './CodeEditor.module.scss'
import './storyblok-theme.scss'
import {CodeEditorContent} from "./CodeEditorContent";
import {withLength} from "./withLength";
import {highlightLines} from "./highlightLines";
import {toggleLine} from "./toggleLine";

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

  const setCode = useCallback((value: CodeEditorContent['code']) =>
    setContent({
      ...content,
      code: value,
    }), [setContent, content])

  const setHighlightedLines = useCallback((value: CodeEditorContent['highlightedLines']) =>
    setContent({
      ...content,
      highlightedLines: value,
    }), [setContent, content])


  const onBeforeChange: OnBeforeChange = (
    editor,
    data,
    value,
  ) => setCode( value)

  const onGutterClick: OnGutterClick = (editor, line) => {
    setHighlightedLines(toggleLine(highlightedLines, line))
  }

  const editorDidConfigure: EditorDidConfigure = (e) => {
    editor.current = e
  }

  useEffect(() => {
    // Sync props.highlightedLines.length with the number of lines in the code
    setHighlightedLines(
      withLength(highlightedLines, editor.current?.lineCount() ?? 0),
    )
  }, [code])
  useEffect(() => {
    // Sync props.highlightedLines with editor
    editor.current && highlightLines(editor.current, highlightedLines)
  }, [highlightedLines])

  return (
    <ControlledCodeMirror
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

