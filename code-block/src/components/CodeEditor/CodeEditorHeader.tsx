import {
  ChangeEventHandler,
  createElement,
  FunctionComponent,
  useMemo,
  useState,
} from 'react'
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
  languages: string[]
  enableLineNumberStart: boolean
}> = (props) => {
  const { enableTitle, languages, enableLineNumberStart } = props
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    props.onTitleChange(value === '' ? undefined : value)
  }

  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.currentTarget
    props.onLanguageChange(value === '' ? undefined : value)
  }

  const handleLineNumberOffsetChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { value } = e.currentTarget
    props.onLineNumberStartChange(integerFromString(value))
  }

  if (!enableTitle && !languages && !enableLineNumberStart) {
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
          <InputField
            component="input"
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
          <InputField
            component="input"
            id="lineNumberStart"
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
        {languages && (
          <InputField
            component="select"
            id="language"
            label="Language"
            value={props.language}
            onChange={handleLanguageChange}
            css={css({
              width: '20ch',
            })}
          >
            <option value=""></option>
            {languages.map((language, index) => (
              <option
                key={index}
                value={language}
              >
                {language}
              </option>
            ))}
          </InputField>
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

  '& > input, & > select': {
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',

    marginLeft: 15,
    marginRight: 15,
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
      appearance: 'none',
    },
    'input[type=number]': {
      appearance: 'textfield',
    },
  },
})

const inputCss = css({})

const InputField = <Component extends 'select' | 'input'>(
  props: {
    label: string
    component: Component
  } & JSX.IntrinsicElements[Component],
): JSX.Element => {
  const { label, component, ...inputProps } = props
  const [focused, setFocused] = useState(false)

  const dividerCss = useMemo(
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
    <FieldSet>
      <Label
        htmlFor={props.id}
        focused={focused}
      >
        {label}
      </Label>
      {createElement(component, {
        css: inputCss,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        ...inputProps,
      })}
      <Divider css={dividerCss} />
    </FieldSet>
  )
}

export const Select: FunctionComponent<JSX.IntrinsicElements['select']> = (
  props,
) => (
  <select
    css={inputCss}
    {...props}
  />
)

export const Input: FunctionComponent<JSX.IntrinsicElements['input']> = (
  props,
) => (
  <input
    css={inputCss}
    {...props}
  />
)
export const FieldSet: FunctionComponent<JSX.IntrinsicElements['fieldset']> = (
  props,
) => (
  <fieldset
    css={fieldsetCss}
    {...props}
  />
)

export const Label: FunctionComponent<
  { focused: boolean } & JSX.IntrinsicElements['label']
> = (props) => {
  const { focused, ...labelProps } = props
  const labelCss = useMemo(
    () =>
      css({
        transition: transition('color'),
        color: focused ? sb_green : sb_dark_blue_50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 0,
        padding: 0,
        // Typography
        fontSize: '10px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
      }),
    [focused],
  )

  return (
    <label
      htmlFor={props.id}
      css={labelCss}
      {...labelProps}
    />
  )
}

const dividerCss = css({
  width: '100%',
  borderWidth: borderWith,
  borderBottomStyle: 'solid',
  color: sb_dark_blue_50,
  borderBottomColor: 'currentcolor',
  marginBlockStart: 0,
  marginBlockEnd: 0,
})

const Divider: FunctionComponent<JSX.IntrinsicElements['div']> = (props) => {
  return (
    <div
      css={dividerCss}
      {...props}
    />
  )
}
