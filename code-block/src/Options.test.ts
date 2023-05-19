import {
  defaultHighlightStateOption,
  HighlightStateOption,
  highlightStateOptionFromOptions,
  Options,
} from './Options'

const stub: Options = {}

describe('Options', () => {
  describe('highlightState', () => {
    describe('parsing', () => {
      it('adds a default state', () => {
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: JSON.stringify(
              [] satisfies HighlightStateOption[],
            ),
          }),
        ).toHaveLength(1)
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: JSON.stringify([
              {
                value: 'a',
                color: 'red',
              },
            ] satisfies HighlightStateOption[]),
          }),
        ).toEqual(expect.arrayContaining([defaultHighlightStateOption]))
      })
      it('is optional', () => {
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: undefined,
          }),
        ).toEqual([defaultHighlightStateOption])
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: '',
          }),
        ).toEqual([defaultHighlightStateOption])
      })
      it('returns an Error when the JSON is invalid', () => {
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: '{value: 1}',
          }),
        ).toBeInstanceOf(Error)
      })
      it('returns an Error when the JSON does not adhere to the schema ', () => {
        expect(
          highlightStateOptionFromOptions({
            ...stub,
            highlightStates: '{"blah": 123}',
          }),
        ).toBeInstanceOf(Error)
      })
    })
  })
})
