import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import {CodeEditor} from "./CodeEditor";

export const App: FunctionComponent = () => {
  const { type, data, actions, error } = useFieldPlugin()

  if (type === 'loading') {
    return <></>
  }

  if (type === 'error') {
    console.error(error.message)
    return <></>
  }

  const content = typeof data.content === 'string' ? data.content : ''

  return (
    <CodeEditor
      content={content}
      setContent={actions.setContent}
    />
  )
}
