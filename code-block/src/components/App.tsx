import { FunctionComponent } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import { CodeEditor } from './CodeEditor'
import {
  defaultLineState,
  lineStates,
  parseCodeEditorState,
} from './CodeEditor/CodeEditorContent'
import { colorFromLineStateLineStateFromOptions } from '../Options'

export const App: FunctionComponent = () => {
  const { type, data, actions, error } = useFieldPlugin()

  if (type === 'loading') {
    return <></>
  }

  if (type === 'error') {
    console.error(error.message)
    return <></>
  }

  const colorFromLineState = colorFromLineStateLineStateFromOptions(
    data.options,
  )

  if (colorFromLineState instanceof Error) {
    // TODO better UI
    return <>Error: ${colorFromLineState.message}</>
  }

  const content = parseCodeEditorState(data.content)

  const f = (lineState: string): string => {
    const defaultColor = 'transparent'
    if (!colorFromLineState) {
      return defaultColor
    }
    return (
      colorFromLineState.find((it) => it.value === lineState)?.color ??
      defaultColor
    )
  }

  // TODO unique
  const lineStateValues: string[] = [
    defaultLineState,
    ...(colorFromLineState?.map((it) => it.value) ?? []),
  ]

  return (
    <CodeEditor
      content={content}
      setContent={actions.setContent}
      colorFromLineState={f}
      lineStateValues={lineStateValues}
    />
  )
}
