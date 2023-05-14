import { nextLineState } from './nextLineState'

describe('nextLineState', () => {
  it('default -> highlight', () => {
    expect(nextLineState('default')).toBe('neutral')
  })
  it('highlight -> add', () => {
    expect(nextLineState('neutral')).toBe('add')
  })
  it('add -> remove', () => {
    expect(nextLineState('add')).toBe('remove')
  })
  it('remove -> default', () => {
    expect(nextLineState('remove')).toBe('default')
  })
})
