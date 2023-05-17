import { ChangeEventHandler, FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { withLength } from './withLength'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { gutterColorFromState } from './gutterColorFromState'
import { mix } from './mix'
import { backgroundColorFromState } from './backgroundColorFromState'
import {
  sb_dark_blue,
  sb_dark_blue_50,
  sb_dark_blue_75,
  sb_dark_blue_hover,
  sb_green,
  sb_green_25,
  white,
} from '../../storyblok-design'
import { css } from '@emotion/react'
import { transition } from '../../storyblok-design'

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
          color: white,
        })}
      >
        <input
          css={css({
            flex: 1,

            color: 'inherit',
            border: 'none',
            outline: 'none',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',

            margin: '0px',
            padding: '5px 15px',
            fontSize: '12px',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1.66',
            letterSpacing: '0.03333em',
            transition: transition('background-color'),
            backgroundColor: sb_dark_blue,
            borderBottomWidth: `1px`,
            borderBottomStyle: `solid`,
            borderBottomColor: sb_dark_blue_75,

            '&:focus': {
              outline: 'none',
              boxShadow: `0 0 0 3px ${sb_green_25}`,
              borderBottomColor: sb_green,
            },
            '&:hover': {
              outline: 'none',
              borderBottomColor: sb_green,
              backgroundColor: sb_dark_blue_hover,
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
