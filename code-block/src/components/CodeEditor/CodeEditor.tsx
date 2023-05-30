import { FunctionComponent } from 'react'
import { CodeEditorContent } from './CodeEditorContent'
import { toggleLine } from './toggleLine'
import { CodeMirror } from '../CodeMirror'
import { mix } from './mix'
import { css } from '@emotion/react'
import { CodeBlockOptions, defaultHighlightStateOption } from '../../Options'
import { colorFromHighlightState } from './colorFromHighlightState'
import { withLength } from '../../utils'
import { CodeEditorHeader } from './CodeEditorHeader'

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

  const onChange = (value: string, lineCount: number) =>
    setContent((content) => ({
      ...content,
      code: value,
      highlightStates: options.highlightStates
        ? withLength(
            content.highlightStates ?? [],
            lineCount,
            defaultHighlightStateOption.value,
          )
        : undefined,
    }))

  const handleLineNumberClick = (line: number, lineCount: number) =>
    setContent((content) => ({
      ...content,
      highlightStates: options.highlightStates
        ? toggleLine(
            options.highlightStates,
            withLength(
              content.highlightStates ?? [],
              lineCount,
              defaultHighlightStateOption.value,
            ),
            line,
          )
        : undefined,
    }))

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
        enableLanguage={options.enableLanguage}
        enableLineNumberStart={options.enableLineNumberStart}
      />
      <CodeMirror
        css={css(
          props.content.highlightStates?.map(
            (state, index) =>
              options.highlightStates && {
                [`.cm-gutterElement:nth-of-type(${index + 2})`]: {
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
