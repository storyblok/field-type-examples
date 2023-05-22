import {
  defaultLineStateOption,
  LineStateOption,
  lineStateOptionFromOptions,
  Options,
} from './Options'

const stub: Options = {}

describe('Options', () => {
  describe('lineState', () => {
    describe('parsing', () => {
      it('adds a default state', () => {
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: JSON.stringify([] satisfies LineStateOption[]),
          }),
        ).toHaveLength(1)
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: JSON.stringify([
              {
                value: 'a',
                color: 'red',
              },
            ] satisfies LineStateOption[]),
          }),
        ).toEqual(expect.arrayContaining([defaultLineStateOption]))
      })
      it('is optional', () => {
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: undefined,
          }),
        ).toEqual([defaultLineStateOption])
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: '',
          }),
        ).toEqual([defaultLineStateOption])
      })
      it('returns an Error when the JSON is invalid', () => {
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: '{value: 1}',
          }),
        ).toBeInstanceOf(Error)
      })
      it('returns an Error when the JSON does not adhere to the schema ', () => {
        expect(
          lineStateOptionFromOptions({
            ...stub,
            lineStates: '{"blah": 123}',
          }),
        ).toBeInstanceOf(Error)
      })
    })
  })
})
