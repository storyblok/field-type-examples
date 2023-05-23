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
import { integerFromString } from '../../utils/numberFromString'

export const CodeEditorHeader: FunctionComponent<{
  title: string | undefined
  onTitleChange: (title: string | undefined) => void
  lineNumberStart: number | undefined
  onLineNumberStartChange: (lineNumberStart: number | undefined) => void
}> = (props) => {
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    props.onTitleChange(value === '' ? undefined : value)
  }

  const handleLineNumberOffsetChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { value } = e.currentTarget
    props.onLineNumberStartChange(integerFromString(value))
  }

  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: sb_dark_blue,
        color: white,
      })}
    >
      <FieldSet
        css={{
          flex: 1,
        }}
      >
        <input
          id="title"
          placeholder="Title"
          onChange={handleTitleChange}
          value={props.title}
        />
      </FieldSet>
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
      '& > *': {
        padding: '7px 15px',
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
          '-webkit-appearance': 'none',
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
