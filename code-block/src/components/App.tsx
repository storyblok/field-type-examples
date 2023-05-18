import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import { parseCodeEditorState } from './CodeEditor/CodeEditorContent'
import { lineStateOptionFromOptions } from '../Options'
import { ErrorAlert } from './ErrorAlert'

export const App: FunctionComponent = () => {
  const { type, data, actions, error } = useFieldPlugin()

  if (type === 'loading') {
    return <></>
  }

  if (type === 'error') {
    console.error(error.message)
    return <></>
  }

  const lineStateOption = lineStateOptionFromOptions(data.options)

  if (lineStateOption instanceof Error) {
    return (
      <ErrorAlert title="Error parsing options">
        {lineStateOption.message}
      </ErrorAlert>
    )
  }

  const content = parseCodeEditorState(data.content)

  return (
    <CodeEditor
      content={content}
      setContent={actions.setContent}
      lineStateOptions={lineStateOption}
    />
  )
}
