import { nextLineState } from './nextLineState'

describe('nextLineState', () => {
  it('default -> highlight', () => {
    expect(nextLineState('')).toBe('0')
  })
  it('highlight -> add', () => {
    expect(nextLineState('0')).toBe('+')
  })
  it('add -> remove', () => {
    expect(nextLineState('+')).toBe('-')
  })
  it('remove -> default', () => {
    expect(nextLineState('-')).toBe('')
  })
})
