import { onChangeSetAction } from './onChangeSetAction'
import { CodeEditorContent } from './CodeEditorContent'
import { CodeBlockOptions, defaultHighlightStateOption } from '../../Options'

const options: CodeBlockOptions['highlightStates'] = [
  {
    value: '',
    color: 'transparent',
  },
  {
    value: 'neutral',
    color: 'yellow',
  },
  {
    value: 'add',
    color: 'green',
  },
  {
    value: 'remove',
    color: 'red',
  },
]

describe('onChangeSetAction', () => {
  describe('other properties', () => {
    it('preserves other properties', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: [''],
        title: 'a title',
        language: 'js',
        lineNumberStart: 2,
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { code, highlightStates, ...otherContent } = content
      expect(onChangeSetAction(undefined, 'any content', 4)(content)).toEqual(
        expect.objectContaining(otherContent),
      )
    })
  })
  describe('code', () => {
    it('sets the code', () => {
      const content: CodeEditorContent = {
        code: '',
      }
      expect(
        onChangeSetAction(undefined, 'new content', 1)(content).code,
      ).toEqual('new content')
    })
  })
  describe('highlightStates', () => {
    it('becomes undefined when options.highlightStates is undefined', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: [],
      }
      expect(
        onChangeSetAction(undefined, 'new content', 1)(content).highlightStates,
      ).toBeUndefined()
    })
    it('becomes defined when options.highlightStates is defined', () => {
      const content: CodeEditorContent = {
        code: '',
      }
      expect(
        onChangeSetAction(options, 'new content', 1)(content).highlightStates,
      ).toBeDefined()
    })
    it('has the same length as the number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: [],
      }
      expect(
        onChangeSetAction(options, 'new content', 5)(content).highlightStates,
      ).toHaveLength(5)
      expect(
        onChangeSetAction(options, 'new content', 1)(content).highlightStates,
      ).toHaveLength(1)
    })
    it('extends to the same number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: ['existingState'],
      }
      const newContent = onChangeSetAction(
        options,
        'new content',
        2,
      )(content).highlightStates
      expect(newContent?.[0]).toEqual('existingState')
      expect(newContent).toHaveLength(2)
    })
    it('shortens to the same number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: ['a', 'b', 'c'],
      }
      const newContent = onChangeSetAction(
        options,
        'new content',
        2,
      )(content).highlightStates
      expect(newContent).toEqual(['a', 'b'])
    })
    it('does not change when the line count is preserved', () => {
      const highlightStates = ['a', 'b', 'c']
      const content: CodeEditorContent = {
        code: '',
        highlightStates,
      }
      const newContent = onChangeSetAction(
        [defaultHighlightStateOption(options)],
        'new content',
        3,
      )(content).highlightStates
      expect(newContent).toBe(highlightStates)
    })
  })
})
