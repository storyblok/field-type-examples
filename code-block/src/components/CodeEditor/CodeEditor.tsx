import { FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { CodeMirror } from '../CodeMirror'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
}> = (props) => {
  const { content, setContent } = props
  const { code } = content

  const onChange = (value: string) =>
    setContent({
      ...content,
      code: value,
    })

  return (
    <CodeMirror
      initialValue={code}
      onChange={onChange}
    />
  )
}
