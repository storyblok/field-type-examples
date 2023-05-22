import {
  defaultHighlightStateOption,
  HighlightStateOption,
  highlightStatesOptionFromOptions,
  Options,
} from './Options'

const stub: Options = {}

describe('Options', () => {
  describe('highlightState', () => {
    describe('parsing', () => {
      it('adds a default state', () => {
        expect(
          highlightStatesOptionFromOptions({
            ...stub,
            highlightStates: JSON.stringify(
              [] satisfies HighlightStateOption[],
            ),
          }),
        ).toHaveLength(1)
        expect(
          highlightStatesOptionFromOptions({
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
          highlightStatesOptionFromOptions({
            ...stub,
            highlightStates: undefined,
          }),
        ).toEqual([defaultHighlightStateOption])
        expect(
          highlightStatesOptionFromOptions({
            ...stub,
            highlightStates: '',
          }),
        ).toEqual([defaultHighlightStateOption])
      })
      it('returns an Error when the JSON is invalid', () => {
        expect(
          highlightStatesOptionFromOptions({
            ...stub,
            highlightStates: '{value: 1}',
          }),
        ).toBeInstanceOf(Error)
      })
      it('returns an Error when the JSON does not adhere to the schema ', () => {
        expect(
          highlightStatesOptionFromOptions({
            ...stub,
            highlightStates: '{"blah": 123}',
          }),
        ).toBeInstanceOf(Error)
      })
    })
  })
})
