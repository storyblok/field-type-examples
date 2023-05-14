import { toggleLineState } from './toggleLineState'

describe('toggleLineState', () => {
  it('default -> highlight', () => {
    expect(toggleLineState('default')).toBe('highlight')
  })
  it('highlight -> add', () => {
    expect(toggleLineState('neutral')).toBe('add')
  })
  it('add -> remove', () => {
    expect(toggleLineState('add')).toBe('remove')
  })
  it('remove -> default', () => {
    expect(toggleLineState('remove')).toBe('default')
  })
})
