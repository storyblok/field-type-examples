import { CodeBlockOptions, defaultHighlightStateOption } from '../../Options'
import { CodeEditorContent } from './CodeEditorContent'
import { toggleLine } from './toggleLine'
import { withLength } from '../../utils'

export const onLineClickSetAction =
  (
    options: CodeBlockOptions['highlightStates'],
    lineCount: number,
    line: number,
  ) =>
  (content: CodeEditorContent): CodeEditorContent => ({
    ...content,
    highlightStates: options
      ? toggleLine(
          options,
          withLength(
            content.highlightStates ?? [],
            lineCount,
            defaultHighlightStateOption(options).value,
          ),
          line,
        )
      : undefined,
  })
