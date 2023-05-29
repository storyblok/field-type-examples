import {
  defaultHighlightStateOption,
  HighlightStateOption,
  parseOptions,
} from './Options'

describe('Options', () => {
  test('that all option are optional', () => {
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
  describe('enableLanguage', () => {
    it('can be "true"', () => {
      expect(
        parseOptions({
          enableLanguage: 'true',
        }),
      ).toHaveProperty('enableLanguage', true)
    })
    it('can be "false"', () => {
      expect(
        parseOptions({
          enableLanguage: 'false',
        }),
      ).toHaveProperty('enableLanguage', false)
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          enableLanguage: '',
        }),
      ).toHaveProperty('enableLanguage', false)
    })
    it('can not be any string', () => {
      expect(
        parseOptions({
          enableLanguage: 'somethignelse',
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('enableStartsAt', () => {
    it('can be "true"', () => {
      expect(
        parseOptions({
          enableStartsAt: 'true',
        }),
      ).toHaveProperty('enableStartsAt', true)
    })
    it('can be "false"', () => {
      expect(
        parseOptions({
          enableStartsAt: 'false',
        }),
      ).toHaveProperty('enableStartsAt', false)
    })
    it('can be "empty"', () => {
      expect(
        parseOptions({
          enableStartsAt: '',
        }),
      ).toHaveProperty('enableStartsAt', false)
    })
    it('can not be any string', () => {
      expect(
        parseOptions({
          enableStartsAt: 'somethignelse',
        }),
      ).toBeInstanceOf(Error)
    })
  })
  describe('highlightState', () => {
    describe('parsing', () => {
      it('adds a default state', () => {
        expect(
          parseOptions({
            highlightStates: JSON.stringify(
              [] satisfies HighlightStateOption[],
            ),
          }),
        ).toHaveProperty(
          'highlightStates',
          expect.arrayContaining([defaultHighlightStateOption]),
        )
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
