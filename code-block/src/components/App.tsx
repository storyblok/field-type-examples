import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import {
  CodeEditorContent,
  parseCodeEditorState,
} from './CodeEditor/CodeEditorContent'
import { lineStateOptionFromOptions } from '../Options'
import { ErrorAlert } from './ErrorAlert'
import { SetContent } from '@storyblok/field-plugin'

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

  const setContent = (
    setStateAction: CodeEditorContent | ((content: CodeEditorContent) => void),
  ) => {
    if (typeof setStateAction === 'function') {
      actions.setContent((oldContent) =>
        setStateAction(parseCodeEditorState(oldContent)),
      )
    } else {
      actions.setContent(setStateAction)
    }
  }

  return (
    <CodeEditor
      content={content}
      setContent={setContent}
      lineStateOptions={lineStateOption}
    />
  )
}
