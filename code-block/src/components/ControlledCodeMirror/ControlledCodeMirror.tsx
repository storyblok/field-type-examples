import { FunctionComponent } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import { useFunction } from './useFunction'

export type OnBeforeChange = (
  editor: CodeMirror.Editor,
  data: CodeMirror.EditorChange,
  value: string,
) => void

export type OnGutterClick = (
  editor: CodeMirror.Editor,
  lineNumber: number,
  gutter: string,
  event: Event,
) => void

export type EditorDidConfigure = (editor: CodeMirror.Editor) => void

export type OnRenderLine = (
  editor: CodeMirror.Editor,
  line: CodeMirror.LineHandle,
  element: HTMLElement,
) => void

/**
 * Controlled Code Mirror component where the event handlers can change after the initial render.
 * react-codemirror2's controlled codemirror component only binds the event listener that are initially attached to codemirror.
 */
export const ControlledCodeMirror: FunctionComponent<{
  className?: string
  options?: CodeMirror.EditorConfiguration
  value: string
  onBeforeChange?: OnBeforeChange
  onGutterClick?: OnGutterClick
  editorDidConfigure?: EditorDidConfigure
  onRenderLine?: OnRenderLine
}> = (props) => {
  const editorDidConfigure = useFunction(props.editorDidConfigure)
  const onBeforeChange = useFunction(props.onBeforeChange)
  const onGutterClick = useFunction(props.onGutterClick)
  const onRenderLine = useFunction(props.onRenderLine)

  return (
    <CodeMirror
      className={props.className}
      value={props.value}
      options={props.options}
      onRenderLine={onRenderLine}
      editorDidMount={editorDidConfigure}
      onBeforeChange={onBeforeChange}
      onGutterClick={onGutterClick}
    />
  )
}
