import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import { parseCodeEditorState } from './CodeEditor/CodeEditorContent'
import { highlightStateOptionFromOptions } from '../Options'
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

  const highlightStateOption = highlightStateOptionFromOptions(data.options)

  if (highlightStateOption instanceof Error) {
    return (
      <ErrorAlert title="Error parsing options">
        {highlightStateOption.message}
      </ErrorAlert>
    )
  }

  const content = parseCodeEditorState(data.content)

  return (
    <CodeEditor
      content={content}
      setContent={actions.setContent}
      highlightStateOptions={highlightStateOption}
    />
  )
}
