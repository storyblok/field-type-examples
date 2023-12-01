import { initials } from './initials'

describe('initials()', () => {
  it('Should give zero letters for an empty string', () => {
    expect(initials('')).toEqual('')
  })
  it('Should give one letter for a single word', () => {
    expect(initials('Johannes')).toEqual('J')
  })
  it('Should give two letters for a double words', () => {
    expect(initials('Johannes Lindgren')).toEqual('JL')
  })
  it('Should give three letters for a triple words', () => {
    expect(initials('Johannes Arnold Lindgren')).toEqual('JAL')
  })
  it('Should give two letters for a many words', () => {
    expect(initials('Johannes Arnold Thomas Lindgren')).toEqual('JAT')
  })
  it('The letters should be capitalized', () => {
    expect(initials('johannes lindgren')).toEqual('JL')
  })
})
