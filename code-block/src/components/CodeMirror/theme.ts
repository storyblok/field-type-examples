import { EditorView } from '@codemirror/view'
import {
  sb_dark_blue,
  sb_dark_blue_75,
  sb_dark_blue_hover,
  sb_green,
  transition,
  white,
  yellow,
} from '../../storyblok-design'

/**
 * A Code Mirror theme extension for Storyblok
 */
export const theme = (enableClickableGutters: boolean) =>
  EditorView.theme(
    {
      '&': {
        color: 'white',
        backgroundColor: sb_dark_blue,
        '&.cm-focused': {
          outline: 'none',
        },
      },
      '.cm-content, .cm-gutter': {
        minHeight: '100px',
      },
      '.cm-content': {
        caretColor: yellow,
        paddingTop: '15px',
        paddingBottom: '15px',
        backgroundColor: sb_dark_blue,
        transition: transition('background-color'),
        '&:hover': {
          backgroundColor: sb_dark_blue_hover,
        },
      },
      '.cm-line': {
        paddingLeft: '15px',
      },
      '&.cm-focused .cm-cursor': {
        borderLeftColor: yellow,
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: sb_green,
      },
      '.cm-gutters': {
        backgroundColor: sb_dark_blue,
        color: sb_dark_blue_75,
        border: 'none',
      },
      '& .cm-lineNumbers .cm-gutterElement': {
        paddingLeft: '15px',
        transition: transition('color'),
        ...(enableClickableGutters
          ? {
              cursor: 'pointer',
              '&:hover': {
                color: white,
              },
            }
          : {}),
      },
    },
    { dark: true },
  )
