import { hexToSRGB, SRGB } from '@/utils'

const black: SRGB = {
  r: 0,
  g: 0,
  b: 0,
}
const white: SRGB = {
  r: 1,
  g: 1,
  b: 1,
}
const red: SRGB = {
  r: 1,
  g: 0,
  b: 0,
}
const green: SRGB = {
  r: 0,
  g: 1,
  b: 0,
}
const blue: SRGB = {
  r: 0,
  g: 0,
  b: 1,
}

describe('hexToSRGB', () => {
  it('parses red color', () => {
    expect(hexToSRGB('#FF0000')).toEqual(red)
  })
  it('parses green color', () => {
    expect(hexToSRGB('#00FF00')).toEqual(green)
  })
  it('parses blue color', () => {
    expect(hexToSRGB('#0000FF')).toEqual(blue)
  })
  it('parses white color', () => {
    expect(hexToSRGB('#FFFFFF')).toEqual(white)
  })
  it('parses black color', () => {
    expect(hexToSRGB('#000000')).toEqual(black)
  })
  it('gived undefined if parsing failed', () => {
    expect(hexToSRGB('dummy')).toBeUndefined()
    expect(hexToSRGB('FFFFFF')).toBeUndefined()
    expect(hexToSRGB('#FFF')).toBeUndefined()
    expect(hexToSRGB('0x80')).toBeUndefined()
  })
})
