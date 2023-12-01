import { pseudoRandom } from '../'

const palette = [
  '#00B3B0',
  '#40C6C4',
  '#7FD9D7',
  '#D9F4F3',
  '#1B243F',
  '#545B6F',
  '#8D919F',
  '#C6C8CF',
  '#2DB47D',
  '#62C79E',
  '#96D9BE',
  '#CAECDE',
  '#395ECE',
  '#6B87DB',
  '#9CAEE6',
  '#CDD7F3',
  '#FBCE41',
  '#FCDB71',
  '#FDE6A0',
  '#FEF3CF',
  '#FFAC00',
  '#FFC140',
  '#FFD57F',
  '#FFEABF',
  '#FF6159',
  '#FF8983',
  '#FFB0AC',
  '#FFD7D5',
] as const

// TODO rename to psuedoRandomColor
export const pseudoRandomColor = (seed: string): string => {
  const max = palette.length - 1
  const index = pseudoRandom(seed, max)

  return palette[index] ?? palette[0]
}
