import { CodeEditorContent } from './CodeEditorContent'
import { CodeBlockOptions } from '../../Options'
import { onLineClickSetAction } from './onLineClickSetAction'

const code = 'dummy code'

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
        code,
        highlightStates: [''],
        title: 'a title',
        language: 'js',
        lineNumberStart: 2,
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { highlightStates, ...otherContent } = content
      expect(onLineClickSetAction(undefined, 4, 2)(content)).toEqual(
        expect.objectContaining(otherContent),
      )
    })
  })
  describe('highlightStates', () => {
    it('becomes undefined when options.highlightStates is undefined', () => {
      const content: CodeEditorContent = {
        code,
        highlightStates: [],
      }
      expect(
        onLineClickSetAction(undefined, 2, 1)(content).highlightStates,
      ).toBeUndefined()
    })
    it('becomes defined when options.highlightStates is defined', () => {
      const content: CodeEditorContent = {
        code: '',
      }
      expect(
        onLineClickSetAction(options, 3, 1)(content).highlightStates,
      ).toBeDefined()
    })
    it('has the same length as the number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: [],
      }
      expect(
        onLineClickSetAction(options, 5, 2)(content).highlightStates,
      ).toHaveLength(5)
      expect(
        onLineClickSetAction(options, 1, 0)(content).highlightStates,
      ).toHaveLength(1)
    })
    it('extends to the same number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: ['existingState'],
      }
      const newContent = onLineClickSetAction(
        options,
        2,
        1,
      )(content).highlightStates
      expect(newContent?.[0]).toEqual('existingState')
      expect(newContent).toHaveLength(2)
    })
    it('shortens to the same number of lines as the editor', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: ['a', 'b', 'c'],
      }
      const newContent = onLineClickSetAction(
        options,
        2,
        1,
      )(content).highlightStates
      expect(newContent).toHaveLength(2)
    })
    it('preserves the length when the line count does not change', () => {
      const content: CodeEditorContent = {
        code: '',
        highlightStates: ['a', 'b', 'c'],
      }
      const newContent = onLineClickSetAction(
        options,
        3,
        1,
      )(content).highlightStates
      expect(newContent).toHaveLength(3)
    })
    it('toggles the clicked line', () => {
      const highlightStates = ['', '', '']
      const content: CodeEditorContent = {
        code: '',
        highlightStates,
      }
      const options: CodeBlockOptions['highlightStates'] = [
        {
          value: '',
          color: 'transparent',
        },
        {
          value: 'neutral',
          color: 'yellow',
        },
      ]
      // toggle start, middle, and end
      const toggleLine1 = onLineClickSetAction(options, 3, 0)
      const toggleLine2 = onLineClickSetAction(options, 3, 1)
      const toggleLine3 = onLineClickSetAction(options, 3, 2)
      expect(toggleLine1(content).highlightStates).toEqual(['neutral', '', ''])
      expect(toggleLine2(content).highlightStates).toEqual(['', 'neutral', ''])
      expect(toggleLine3(content).highlightStates).toEqual(['', '', 'neutral'])

      // cycles back to default value
      expect(toggleLine1(toggleLine1(content)).highlightStates).toEqual([
        '',
        '',
        '',
      ])
    })
  })
})
