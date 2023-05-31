import { ChangeEventHandler, FunctionComponent, useMemo, useState } from 'react'
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

const toolbarCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  '& > *:first-child': {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
  },
})

const headerCss = css({
  position: 'relative',
  backgroundColor: sb_dark_blue,
  color: white,
})

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
    <div css={headerCss}>
      <Divider
        css={css({
          position: 'absolute',
          bottom: 0,
        })}
      />
      <div css={toolbarCss}>
        {enableTitle ? (
          <Input
            id="title"
            label="Title"
            onChange={handleTitleChange}
            value={props.title}
          />
        ) : (
          // This element is there to fill the space to the left if the title is disabled,
          //  which will align the other items to the right
          <div />
        )}
        {enableLineNumberStart && (
          <Input
            label="Starts at"
            type="number"
            min={1}
            placeholder="1"
            onChange={handleLineNumberOffsetChange}
            value={props.lineNumberStart}
            css={css({
              width: '5ch',
            })}
          />
        )}
        {enableLanguage && (
          <Input
            value={props.language}
            onChange={handleLanguageChange}
            label="Language"
            css={css({
              width: '10ch',
            })}
          />
        )}
      </div>
    </div>
  )
}

const borderWith = 1

const fieldsetCss = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  border: 'none',
  margin: 0,
  padding: 0,
  color: 'inherit',
  backgroundColor: 'transparent',
  transition: transition('background-color'),

  '&:hover': {
    backgroundColor: sb_dark_blue_hover,
  },

  marginBottom: borderWith,
})

const inputCss = css({
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',

  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 0,
  paddingBottom: 0,
  border: 'none',
  transition: transition('background-color', 'border-color'),
  // Typography
  fontSize: '12px',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 400,
  lineHeight: '1.66',
  letterSpacing: '0.03333em',

  '&::placeholder': {
    color: sb_dark_blue_50,
  },

  '&:focus': {
    borderColor: sb_green,
    outline: 'none',
  },
  // hide up/down arrows
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
  'input[type=number]': {
    MozAppearance: 'textfield',
  },
})

const Input: FunctionComponent<
  { label: string } & JSX.IntrinsicElements['input']
> = (props) => {
  const { label, ...inputProps } = props
  const [focused, setFocused] = useState(false)

  const labelCss = useMemo(
    () =>
      css({
        transition: transition('color'),
        color: focused ? sb_green : sb_dark_blue_50,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 0,
        // Typography
        fontSize: '10px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
      }),
    [focused],
  )
  const borderCss = useMemo(
    () =>
      css({
        position: 'absolute',
        bottom: -borderWith,
        transition: transition('border-bottom-color'),
        color: focused ? sb_green : 'transparent',
      }),
    [focused],
  )
  return (
    <fieldset css={fieldsetCss}>
      <label
        htmlFor={props.id}
        css={labelCss}
      >
        {label}
      </label>
      <input
        css={inputCss}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
      <Divider css={borderCss} />
    </fieldset>
  )
}

const dividerCss = css({
  width: '100%',
  borderBottomWidth: borderWith,
  borderBottomStyle: 'solid',
  color: sb_dark_blue_50,
  borderBottomColor: 'currentcolor',
})

const Divider: FunctionComponent<{
  className?: string
}> = (props) => (
  <div
    className={props.className}
    css={dividerCss}
  />
)
