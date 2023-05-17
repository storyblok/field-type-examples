import { LineState } from './CodeEditorContent'
import { sb_dark_blue, white } from '../../storyblok-design'

export const gutterColorFromState = (state: LineState): string => {
  switch (state) {
    case '':
      return white
    case '0':
      return sb_dark_blue
    case '+':
      return sb_dark_blue
    case '-':
      return sb_dark_blue
  }
}
