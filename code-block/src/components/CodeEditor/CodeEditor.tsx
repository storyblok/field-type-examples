import { FunctionComponent } from 'react'
import {
  CodeEditorContent,
  defaultLineStateColor,
  defaultLineStateValue,
} from './CodeEditorContent'
import { withLength } from './withLength'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { mix } from './mix'
import { sb_dark_blue, white } from '../../design-tokens'
import { css } from '@emotion/react'
import { LineStateOption } from '../../Options'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
  lineStateOption: LineStateOption
}> = (props) => {
  const { content, setContent, lineStateOption } = props
  const { code, lineStates } = content

  const colorFromLineState = (lineState: string): string => {
    const defaultColor = defaultLineStateColor
    if (!lineStateOption) {
      return defaultColor
    }
    return (
      lineStateOption.find((it) => it.value === lineState)?.color ??
      defaultColor
    )
  }

  // TODO unique
  const lineStateValues: string[] = [
    defaultLineStateValue,
    ...(lineStateOption?.map((it) => it.value) ?? []),
  ]

  const onChange = (value: string, lineCount: number) =>
    setContent({
      ...content,
      code: value,
      lineStates: withLength(lineStates, lineCount),
    })

  const handleLineNumberClick = (line: number) =>
    setContent({
      ...content,
      lineStates: toggleLine(lineStateValues, lineStates, line),
    })

  return (
    <CodeMirror
      css={
        colorFromLineState &&
        css(
          content.lineStates.map((state, index) => ({
            [`.cm-gutterElement:nth-child(${index + 2})`]: {
              backgroundColor: mix(
                colorFromLineState(state),
                sb_dark_blue,
                0.5,
              ),
              color:
                colorFromLineState(state) === defaultLineStateColor
                  ? white
                  : sb_dark_blue,
            },
            [`.cm-line:nth-child(${index + 1})`]: {
              backgroundColor: mix(
                colorFromLineState(state),
                sb_dark_blue,
                0.25,
              ),
            },
          })),
        )
      }
      initialValue={code}
      onChange={onChange}
      onLineNumberClick={handleLineNumberClick}
    />
  )
}
