import { LineState } from './CodeEditorContent'
import { green, red, sb_dark_blue, yellow } from '../../storyblok-design'

export const backgroundColorFromState = (state: LineState): string => {
  switch (state) {
    case '':
      return sb_dark_blue
    case '0':
      return yellow
    case '+':
      return green
    case '-':
      return red
  }
}
