import { capitalizeWord } from './capitalizeWord'

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalizeWord('johannes')).toEqual('Johannes')
  })
  it('should leave all characters be except for the first letter', () => {
    expect(capitalizeWord('johanneS lindgren')).toEqual('JohanneS lindgren')
  })
})
