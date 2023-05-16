import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import { parseCodeEditorState } from './CodeEditor/CodeEditorContent'

export const App: FunctionComponent = () => {
  const { type, data, actions, error } = useFieldPlugin()

  if (type === 'loading') {
    return <></>
  }

  if (type === 'error') {
    console.error(error.message)
    return <></>
  }

  const content = parseCodeEditorState(data.content)

  return (
    <CodeEditor
      content={content}
      setContent={actions.setContent}
    />
  )
}
