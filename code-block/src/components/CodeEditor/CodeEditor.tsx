import { FunctionComponent } from 'react'
import { ControlledCodeMirror } from '../ControlledCodeMirror'
import { CodeEditorContent, LineState } from './CodeEditorContent'
import { withLength } from './withLength'
import { toggleLine } from './toggleLine'
import { css } from '@emotion/css'
import { green, red, sb_dark_blue, white, yellow } from './theme'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (content: CodeEditorContent) => void
}> = (props) => {
  const { content, setContent } = props
  const { code, highlightedLines } = content

  const onChange = (value: string, lineCount: number) =>
    setContent({
      ...content,
      code: value,
      highlightedLines: withLength(highlightedLines, lineCount),
    })

  const handleLineNumberClick = (line: number) =>
    setContent({
      ...content,
      highlightedLines: toggleLine(highlightedLines, line),
    })

  return (
    <ControlledCodeMirror
      className={css(
        content.highlightedLines.map((state, index) => ({
          [`.cm-gutterElement:nth-child(${index + 2})`]: {
            backgroundColor: gutterBackgroundColor(state),
            color: gutterColorFromState(state),
          },
          [`.cm-line:nth-child(${index + 1})`]: {
            backgroundColor: lineBackgroundColor(state),
          },
        })),
      )}
      initialValue={code}
      onChange={onChange}
      onLineNumberClick={handleLineNumberClick}
    />
  )
}

const gutterBackgroundColor = (state: LineState): string =>
  `color-mix(in srgb, ${backgroundColorFromState(state)} 50%, ${sb_dark_blue})`

const lineBackgroundColor = (state: LineState): string =>
  `color-mix(in srgb, ${backgroundColorFromState(state)} 25%, ${sb_dark_blue})`

const backgroundColorFromState = (state: LineState): string => {
  switch (state) {
    case '':
      return sb_dark_blue
    case '0':
      return yellow
    case '+':
      return green
    case '-':
      return red
  }
}

const gutterColorFromState = (state: LineState): string => {
  switch (state) {
    case '':
      return white
    case '0':
      return sb_dark_blue
    case '+':
      return sb_dark_blue
    case '-':
      return sb_dark_blue
  }
}
