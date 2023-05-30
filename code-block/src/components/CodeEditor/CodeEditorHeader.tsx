import { ChangeEventHandler, FunctionComponent } from 'react'
import { css } from '@emotion/react'
import {
  sb_dark_blue,
  sb_dark_blue_50,
  sb_dark_blue_hover,
  sb_green,
  transition,
  white,
} from '../../storyblok-design'
import { integerFromString } from '../../utils'

export const CodeEditorHeader: FunctionComponent<{
  title: string | undefined
  onTitleChange: (title: string | undefined) => void
  language: string | undefined
  onLanguageChange: (language: string | undefined) => void
  lineNumberStart: number | undefined
  onLineNumberStartChange: (lineNumberStart: number | undefined) => void
  enableTitle: boolean
  enableLanguage: boolean
  enableLineNumberStart: boolean
}> = (props) => {
  const { enableTitle, enableLanguage, enableLineNumberStart } = props
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    props.onTitleChange(value === '' ? undefined : value)
  }

  const handleLanguageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    props.onLanguageChange(value === '' ? undefined : value)
  }

  const handleLineNumberOffsetChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { value } = e.currentTarget
    props.onLineNumberStartChange(integerFromString(value))
  }

  if (!enableTitle && !enableLanguage && !enableLineNumberStart) {
    return <></>
  }

  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        backgroundColor: sb_dark_blue,
        color: white,
      })}
    >
      <FieldSet
        css={css({
          flex: 1,
        })}
      >
        {enableTitle ? (
          <input
            id="title"
            placeholder="Title"
            onChange={handleTitleChange}
            value={props.title}
          />
        ) : (
          // This element is there to fill the space to the left if the title is disabled,
          //  which will align the other items to the right
          <div
            css={css({
              flex: 1,
            })}
          />
        )}
      </FieldSet>
      {enableLineNumberStart && (
        <FieldSet>
          <label htmlFor="lineNumberStart">Starts at:</label>
          <input
            id="lineNumberStart"
            type="number"
            min={1}
            css={css({
              appearance: 'textfield',
              width: '5ch',
            })}
            placeholder="1"
            onChange={handleLineNumberOffsetChange}
            value={props.lineNumberStart}
          />
        </FieldSet>
      )}
      {enableLanguage && (
        <FieldSet>
          <input
            id="language"
            placeholder="Language"
            css={css({
              maxWidth: '10ch',
            })}
            onChange={handleLanguageChange}
            value={props.language}
          />
        </FieldSet>
      )}
    </div>
  )
}
const FieldSet: FunctionComponent<
  React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >
> = (props) => (
  <fieldset
    css={css({
      display: 'flex',
      border: 'none',
      margin: 0,
      padding: 0,
      color: 'inherit',
      backgroundColor: 'inherit',
      '& > *:first-child': {
        paddingLeft: '15px',
      },
      '& > *:last-child': {
        paddingRight: '15px',
      },
      '& > *': {
        padding: '7px 5px',
        border: 'none',
        borderBottom: `1px solid ${sb_dark_blue_50}`,
        transition: transition('background-color', 'border-color'),
        // Typography
        fontSize: '12px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
      },
      '& > label': {
        color: sb_dark_blue_50,
      },
      '& > input': {
        flex: 1,
        color: 'inherit',
        backgroundColor: 'inherit',

        '&::placeholder': {
          color: sb_dark_blue_50,
        },
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
        },
      },
      '& > input:focus': {
        borderColor: sb_green,
        outline: 'none',
      },
      '&:hover input': {
        backgroundColor: sb_dark_blue_hover,
      },
    })}
    {...props}
  />
)
