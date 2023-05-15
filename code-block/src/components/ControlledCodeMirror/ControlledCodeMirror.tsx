import { FunctionComponent, useEffect, useRef } from 'react'
import { EditorView, ViewPlugin, lineNumbers } from '@codemirror/view'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { useFunction } from './useFunction'
import { sb_dark_blue, sb_green, white, yellow } from '../CodeEditor/theme'

/**
 * A Code Mirror extension that lets you subscribe to state changes.
 * @param onCodeChange
 */
const stateChangePlugin = (
  onCodeChange: (code: string, lineCount: number) => void,
) =>
  ViewPlugin.define(() => ({
    update: (update) => {
      if (update.docChanged) {
        const doc = update.state.doc
        onCodeChange(doc.toString(), doc.lines)
      }
    },
  }))

/**
 * A Code Mirror theme extension for Storyblok
 */
const theme = EditorView.theme(
  {
    '&': {
      // padding: '15px',
      borderRadius: '5px',
      overflow: 'hidden',
      color: 'white',
      backgroundColor: sb_dark_blue,
      minHeight: '100px',
    },
    '.cm-content': {
      caretColor: yellow,
      paddingTop: '15px',
      paddingBottom: '15px',
    },
    '.cm-line': {
      paddingLeft: '15px',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: yellow,
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: sb_green,
    },
    '.cm-gutters': {
      backgroundColor: sb_dark_blue,
      color: '#4c5776',
      border: 'none',
    },
    '& .cm-lineNumbers .cm-gutterElement': {
      paddingLeft: '15px',
      transition: `color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
      cursor: 'pointer',
      '&:hover': {
        color: white,
      },
    },
  },
  { dark: true },
)

/**
 * Controlled Code Mirror component where the event handlers can change after the initial render.
 * react-codemirror2's controlled codemirror component only binds the event listener that are initially attached to codemirror.
 */
export const ControlledCodeMirror: FunctionComponent<{
  className?: string
  initialValue: string
  onChange: (value: string, lineCount: number) => void
  onLineNumberClick: (lineNumber: number) => void
}> = (props) => {
  const { initialValue } = props
  const parentRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView>()

  const onChange = useFunction(props.onChange)
  const onLineNumberClick = useFunction(props.onLineNumberClick)

  useEffect(() => {
    if (!parentRef.current) {
      throw new Error(
        'Failed to mount codemirror component: parent reference is not set.',
      )
    }
    syntaxHighlighting(defaultHighlightStyle)
    viewRef.current = new EditorView({
      doc: initialValue,
      parent: parentRef.current,
      extensions: [
        lineNumbers({
          domEventHandlers: {
            click: (view, line) => {
              const lineNumber = view.state.doc.lineAt(line.from).number - 1
              onLineNumberClick(lineNumber)
              return true
            },
          },
        }),
        stateChangePlugin(onChange),
        theme,
        EditorView.lineWrapping,
      ],
    })
    return () => {
      viewRef.current?.dom.remove()
    }
  }, [theme])

  return (
    <div
      ref={parentRef}
      className={props.className}
    />
  )
}