import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { ControlledCodeMirror } from './ControlledCodeMirror'

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
    <ControlledCodeMirror
      value={content}
      onBeforeChange={(editor, data, value) => actions.setContent(value)}
      options={{
        lineNumbers: true,
        indentWithTabs: false,
        tabSize: 2,
      }}
    />
  )
}
