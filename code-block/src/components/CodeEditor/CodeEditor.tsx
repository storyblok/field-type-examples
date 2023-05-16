import { ChangeEventHandler, FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { withLength } from './withLength'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { gutterColorFromState } from './gutterColorFromState'
import { mix } from './mix'
import { backgroundColorFromState } from './backgroundColorFromState'
import { sb_dark_blue, sb_dark_blue_50, white } from '../../design-tokens'
import { css } from '@emotion/react'

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
      lineStates: toggleLine(lineStates, line),
    })

  const setTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    setContent({
      ...content,
      title: value === '' ? undefined : value,
    })
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
          content.lineStates.map((state, index) => ({
            [`.cm-gutterElement:nth-child(${index + 2})`]: state !== '' && {
              backgroundColor: mix(
                backgroundColorFromState(state),
                sb_dark_blue,
                0.5,
              ),
              color: gutterColorFromState(state),
            },
            [`.cm-line:nth-child(${index + 1})`]: state !== '' && {
              backgroundColor: mix(
                backgroundColorFromState(state),
                sb_dark_blue,
                0.25,
              ),
            },
          })),
        )}
        initialValue={code}
        onChange={onChange}
        onLineNumberClick={handleLineNumberClick}
      />
    </div>
  )
}
