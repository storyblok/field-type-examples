import { CodeBlockOptions, defaultHighlightStateOption } from '../../Options'
import { CodeEditorContent } from './CodeEditorContent'
import { withLength } from '../../utils'

export const onChangeSetAction =
  (
    options: CodeBlockOptions['highlightStates'],
    value: string,
    lineCount: number,
  ) =>
  (content: CodeEditorContent): CodeEditorContent => ({
    ...content,
    code: value,
    highlightStates: options
      ? withLength(
          content.highlightStates ?? [],
          lineCount,
          defaultHighlightStateOption(options).value,
        )
      : undefined,
  })
