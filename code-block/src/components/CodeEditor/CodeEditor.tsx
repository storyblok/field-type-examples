import { FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { withLength } from './withLength'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { gutterColorFromState } from './gutterColorFromState'
import { mix } from './mix'
import { backgroundColorFromState } from './backgroundColorFromState'
import { sb_dark_blue } from '../../design-tokens'
import { css } from '@emotion/react'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
  colorFromLineState?: (lineState: string) => string
  lineStateValues: string[]
}> = (props) => {
  const { content, setContent, colorFromLineState, lineStateValues } = props
  const { code, lineStates } = content

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
            [`.cm-gutterElement:nth-child(${index + 2})`]: state !== '' && {
              backgroundColor: mix(
                colorFromLineState(state),
                sb_dark_blue,
                0.5,
              ),
              color: gutterColorFromState(state),
            },
            [`.cm-line:nth-child(${index + 1})`]: state !== '' && {
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
