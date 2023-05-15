import { FunctionComponent, useEffect, useRef } from 'react'
import { EditorView, ViewPlugin, lineNumbers } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { useSyncedFunction } from './useSyncedFunction'

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
}> = (props) => {
  const { initialValue } = props
  const parentRef = useRef<HTMLDivElement>(null)

  const onChange = useSyncedFunction(props.onChange)

  useEffect(() => {
    if (!parentRef.current) {
      throw new Error(
        'Failed to mount codemirror component: parent reference is not set.',
      )
    }
    syntaxHighlighting(defaultHighlightStyle)
    const editorView = new EditorView({
      doc: initialValue,
      parent: parentRef.current,
      extensions: [
        lineNumbers(),
        EditorView.lineWrapping,
        stateChangePlugin(onChange),
      ],
    })
    return () => {
      editorView.dom.remove()
    }
  }, [])

  return (
    <div
      ref={parentRef}
      className={props.className}
    />
  )
}
