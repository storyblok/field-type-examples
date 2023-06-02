import { FunctionComponent, useMemo } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import {
  CodeEditorContent,
  parseCodeEditorState,
} from './CodeEditor/CodeEditorContent'
import { parseOptions } from '../Options'
import { ErrorAlert } from './ErrorAlert'

export const App: FunctionComponent = () => {
  const { type, data, actions, error } = useFieldPlugin()

  const options = useMemo(() => parseOptions(data?.options), [data?.options])
  const content = useMemo(
    () => parseCodeEditorState(data?.content),
    [data?.content],
  )

  if (type === 'loading') {
    return <></>
  }

  if (type === 'error') {
    console.error(error.message)
    return <></>
  }
  if (options instanceof Error) {
    return (
      <ErrorAlert title="Error parsing options">{options.message}</ErrorAlert>
    )
  }

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
      options={options}
    />
  )
}
