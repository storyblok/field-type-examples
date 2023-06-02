import { HighlightStateOption, parseOptions } from './Options'
import { defaultHighlightStateOptionValue } from './defaultHighlightStateOptionValue'

describe('Options', () => {
  test('that all options are optional', () => {
    expect(parseOptions({})).not.toBeInstanceOf(Error)
  })
  describe('enableTitle', () => {
    it('can be "true"', () => {
      expect(
        parseOptions({
          enableTitle: 'true',
        }),
      ).toHaveProperty('enableTitle', true)
    })
    it('can be "false"', () => {
      expect(
        parseOptions({
          enableTitle: 'false',
        }),
      ).toHaveProperty('enableTitle', false)
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          enableTitle: '',
        }),
      ).toHaveProperty('enableTitle', false)
    })
    it('can not be any string', () => {
      expect(
        parseOptions({
          enableTitle: 'somethignelse',
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('enableLineNumberStart', () => {
    it('can be "true"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'true',
        }),
      ).toHaveProperty('enableLineNumberStart', true)
    })
    it('can be "false"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'false',
        }),
      ).toHaveProperty('enableLineNumberStart', false)
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: '',
        }),
      ).toHaveProperty('enableLineNumberStart', false)
    })
    it('can not be any string', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'somethignelse',
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('languages', () => {
    it('requires at least one element', () => {
      expect(
        parseOptions({
          languages: JSON.stringify([]),
        }),
      ).toBeInstanceOf(Error)
      expect(
        parseOptions({
          languages: JSON.stringify(['Elm']),
        }),
      ).not.toBeInstanceOf(Error)
    })
    it('can be a JSON array of strings', () => {
      expect(
        parseOptions({
          languages: JSON.stringify(['js']),
        }),
      ).toHaveProperty('languages', ['js'])
    })
    it('parses the array', () => {
      expect(
        parseOptions({
          languages: JSON.stringify(['b', 'a', 'B', 'A', 'Á']),
        }),
      ).toHaveProperty('languages', ['b', 'a', 'B', 'A', 'Á'])
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          languages: '',
        }),
      ).not.toBeInstanceOf(Error)
    })
    it('can not be any array', () => {
      expect(
        parseOptions({
          languages: JSON.stringify([1, 2, 3]),
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('enableLineNumberStart', () => {
    it('can be "true"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'true',
        }),
      ).toHaveProperty('enableLineNumberStart', true)
    })
    it('can be "false"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'false',
        }),
      ).toHaveProperty('enableLineNumberStart', false)
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          enableLineNumberStart: '',
        }),
      ).toHaveProperty('enableLineNumberStart', false)
    })
    it('can not be any string', () => {
      expect(
        parseOptions({
          enableLineNumberStart: 'somethignelse',
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('highlightStates', () => {
    describe('parsing', () => {
      it('requires at least one elements', () => {
        expect(
          parseOptions({
            highlightStates: JSON.stringify(
              [] satisfies HighlightStateOption[],
            ),
          }),
        ).toBeInstanceOf(Error)
        expect(
          parseOptions({
            highlightStates: JSON.stringify([
              { value: '', color: 'transparent' },
            ] satisfies HighlightStateOption[]),
          }),
        ).not.toBeInstanceOf(Error)
      })
      it('add a default state to the start of the list', () => {
        const highlightStates: HighlightStateOption[] = [
          { value: 'add', color: 'green' },
        ]
        expect(
          parseOptions({
            highlightStates: JSON.stringify(highlightStates),
          }),
        ).toHaveProperty('highlightStates', [
          defaultHighlightStateOptionValue,
          ...highlightStates,
        ])
      })
      it('can be empty', () => {
        expect(
          parseOptions({
            highlightStates: '',
          }),
        ).not.toBeInstanceOf(Error)
      })
      it('returns an Error when the JSON is invalid', () => {
        expect(
          parseOptions({
            highlightStates: '{value: 1}',
          }),
        ).toBeInstanceOf(Error)
      })
      it('returns an Error when the JSON does not adhere to the schema ', () => {
        expect(
          parseOptions({
            highlightStates: '{"blah": 123}',
          }),
        ).toBeInstanceOf(Error)
      })
    })
  })
})
