import { EditorView } from '@codemirror/view'
import {
  sb_dark_blue,
  sb_dark_blue_75,
  sb_green,
  white,
  yellow,
} from '../../design-tokens'

/**
 * A Code Mirror theme extension for Storyblok
 */
export const theme = (enableClickableGutters: boolean) =>
  EditorView.theme(
    {
      '&': {
        color: 'white',
        backgroundColor: sb_dark_blue,
        minHeight: '100px',
      },
      '.cm-content': {
        caretColor: yellow,
        paddingTop: '15px',
        paddingBottom: '15px',
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
        transition: `color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
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
