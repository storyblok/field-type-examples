import { FunctionComponent, useCallback } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { CodeMirror } from '../CodeMirror'
import { mix } from './mix'
import { css } from '@emotion/react'
import { CodeBlockOptions, defaultHighlightStateOption } from '../../Options'
import { colorFromHighlightState } from './colorFromHighlightState'
import { CodeEditorHeader } from './CodeEditorHeader'
import { onLineClickSetAction } from './onLineClickSetAction'
import { onChangeSetAction } from './onChangeSetAction'
import { sb_dark_blue } from '../../storyblok-design'

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
  options: CodeBlockOptions
}> = (props) => {
  const { setContent, options } = props

  const onChange = useCallback(
    (value: string, lineCount: number) =>
      setContent(onChangeSetAction(options.highlightStates, value, lineCount)),
    [options.highlightStates],
  )
  const handleLineNumberClick = useCallback(
    (line: number, lineCount: number) =>
      setContent(
        onLineClickSetAction(options.highlightStates, lineCount, line),
      ),
    [options.highlightStates],
  )

  const handleTitleChange = (title: string | undefined) =>
    setContent((content) => ({
      ...content,
      title,
    }))

  const handleLanguageChange = (language: string | undefined) =>
    setContent((content) => ({
      ...content,
      language,
    }))

  const handleLineNumberStartChange = (lineNumberStart: number | undefined) =>
    setContent((content) => ({
      ...content,
      lineNumberStart,
    }))

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
      <CodeEditorHeader
        title={props.content.title}
        onTitleChange={handleTitleChange}
        language={props.content.language}
        onLanguageChange={handleLanguageChange}
        lineNumberStart={props.content.lineNumberStart}
        onLineNumberStartChange={handleLineNumberStartChange}
        enableTitle={options.enableTitle}
        languages={options.languages}
        enableLineNumberStart={options.enableLineNumberStart}
      />
      <CodeMirror
        css={css(
          props.content.highlightStates?.map(
            (state, index) =>
              options.highlightStates &&
              state !==
                defaultHighlightStateOption(options.highlightStates).value && {
                [`.cm-gutterElement:nth-of-type(${index + 2})`]: {
                  color: sb_dark_blue,
                  backgroundColor: mix(
                    colorFromHighlightState(options.highlightStates, state),
                    'transparent',
                    0.5,
                  ),
                },
                [`.cm-line:nth-of-type(${index + 1})`]: {
                  backgroundColor: mix(
                    colorFromHighlightState(options.highlightStates, state),
                    'transparent',
                    0.25,
                  ),
                },
              },
          ),
        )}
        initialValue={props.content.code}
        onChange={onChange}
        onLineNumberClick={
          options.highlightStates && options.highlightStates.length > 1
            ? handleLineNumberClick
            : undefined
        }
        lineNumberStart={props.content.lineNumberStart ?? 1}
      />
    </div>
  )
}
