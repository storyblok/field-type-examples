import { FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { mix } from './mix'
import { sb_dark_blue, white } from '../../design-tokens'
import { css } from '@emotion/react'
import { defaultLineStateOption, LineStateOptions } from '../../Options'
import { colorFromLineState } from './colorFromLineState'
import { withLength } from '../../utils'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
  lineStateOptions: LineStateOptions
}> = (props) => {
  const { content, setContent, lineStateOptions } = props
  const { code, lineStates } = content

  const onChange = (value: string, lineCount: number) =>
    setContent({
      ...content,
      code: value,
      lineStates: withLength(
        lineStates,
        lineCount,
        defaultLineStateOption.value,
      ),
    })

  const handleLineNumberClick = (line: number) =>
    setContent({
      ...content,
      lineStates: toggleLine(lineStateOptions, lineStates, line),
    })

  return (
    <CodeMirror
      css={
        colorFromLineState &&
        css(
          content.lineStates.map((state, index) => ({
            [`.cm-gutterElement:nth-of-type(${index + 2})`]: {
              backgroundColor: mix(
                colorFromLineState(lineStateOptions, state),
                sb_dark_blue,
                0.5,
              ),
            },
            [`.cm-line:nth-of-type(${index + 1})`]: {
              backgroundColor: mix(
                colorFromLineState(lineStateOptions, state),
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
