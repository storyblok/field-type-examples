import { ChangeEventHandler, FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { mix } from './mix'
import { sb_dark_blue, sb_dark_blue_50, white } from '../../design-tokens'
import { css } from '@emotion/react'
import { colorFromHighlightState } from './colorFromHighlightState'
import { withLength } from '../../utils'
import {
  defaultHighlightStateOption,
  HighlightStateOptions,
} from '../../Options'

/**
 * A simple code editor without syntax highlighting where the user can select rows in four states: default, highlight, add, remove,
 * @param props
 * @constructor
 */
export const CodeEditor: FunctionComponent<{
  content: CodeEditorContent
  setContent: (
    setStateAction: CodeEditorContent | ((content: CodeEditorContent) => void),
  ) => void
  highlightStatesOption: HighlightStateOptions
}> = (props) => {
  const { setContent, highlightStatesOption } = props

  const onChange = (value: string, lineCount: number) =>
    setContent((content) => ({
      ...content,
      code: value,
      highlightStates: withLength(
        content.highlightStates,
        lineCount,
        defaultHighlightStateOption.value,
      ),
    }))

  const handleLineNumberClick = (line: number) =>
    setContent((content) => ({
      ...content,
      highlightStates: toggleLine(
        highlightStatesOption,
        content.highlightStates,
        line,
      ),
    }))

  const setTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    setContent((content) => ({
      ...content,
      title: value === '' ? undefined : value,
    }))
  }

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        borderRadius: '5px',
        overflow: 'hidden',
      })}
    >
      <div
        css={css({
          display: 'flex',
          borderBottom: `1px solid rgb(141, 145, 159)`,
          padding: '5px 15px',
          backgroundColor: sb_dark_blue,
          color: white,
        })}
      >
        <input
          css={css({
            flex: 1,

            color: 'inherit',
            backgroundColor: 'inherit',
            border: 'none',

            margin: '0px',
            fontSize: '12px',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1.66',
            letterSpacing: '0.03333em',

            '&:focus': {
              outline: 'none',
            },
            '&::placeholder': {
              color: sb_dark_blue_50,
            },
          })}
          placeholder="Title"
          onChange={setTitle}
          value={props.content.title}
        />
      </div>
      <CodeMirror
        css={css(
          props.content.highlightStates.map((state, index) => ({
            [`.cm-gutterElement:nth-of-type(${index + 2})`]: {
              backgroundColor: mix(
                colorFromHighlightState(highlightStatesOption, state),
                sb_dark_blue,
                0.5,
              ),
            },
            [`.cm-line:nth-of-type(${index + 1})`]: {
              backgroundColor: mix(
                colorFromHighlightState(highlightStatesOption, state),
                sb_dark_blue,
                0.25,
              ),
            },
          })),
        )}
        initialValue={props.content.code}
        onChange={onChange}
        onLineNumberClick={
          highlightStatesOption.length > 1 ? handleLineNumberClick : undefined
        }
      />
    </div>
  )
}
