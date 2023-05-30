import { FunctionComponent, useEffect, useRef } from 'react'
import { EditorView, ViewPlugin, lineNumbers } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { useSyncedFunction } from './useSyncedFunction'
import { theme } from './theme'

/**
 * A Code Mirror extension that lets you subscribe to state changes.
 * @param onCodeChange
 */
const stateChangePlugin = (
  onCodeChange: (code: string, lineCount: number) => void,
): Extension =>
  ViewPlugin.define(() => ({
    update: (update) => {
      if (update.docChanged) {
        const doc = update.state.doc
        onCodeChange(doc.toString(), doc.lines)
      }
    },
  }))

/**
 * Controlled Code Mirror component where the event handlers can change after the initial render.
 * react-codemirror2's controlled codemirror component only binds the event listener that are initially attached to codemirror.
 */
export const CodeMirror: FunctionComponent<{
  className?: string
  initialValue: string
  onChange: (value: string, lineCount: number) => void
  onLineNumberClick?: (lineNumber: number, lineCount: number) => void
  lineNumberStart: number
}> = (props) => {
  const { initialValue, lineNumberStart } = props
  const parentRef = useRef<HTMLDivElement>(null)

  const onChange = useSyncedFunction(props.onChange)
  const onLineNumberClick = useSyncedFunction(props.onLineNumberClick)

  const enableClickableLineNumbers =
    typeof props.onLineNumberClick !== 'undefined'

  useEffect(() => {
    if (!parentRef.current) {
      throw new Error(
        'Failed to mount codemirror component: parent reference is not set.',
      )
    }
    const editorView = new EditorView({
      doc: initialValue,
      parent: parentRef.current,
      extensions: [
        lineNumbers({
          formatNumber: (lineNo) => (lineNo + lineNumberStart - 1).toString(10),
          domEventHandlers: {
            click: (view, line) => {
              const { doc } = view.state
              const lineNumber = doc.lineAt(line.from).number - 1
              onLineNumberClick(lineNumber, doc.lines)
              return true
            },
          },
        }),
        EditorView.lineWrapping,
        stateChangePlugin(onChange),
        theme(enableClickableLineNumbers),
      ],
    })
    return () => {
      editorView.dom.remove()
    }
  }, [theme, enableClickableLineNumbers, lineNumberStart])

  return (
    <div
      ref={parentRef}
      className={props.className}
    />
  )
}
