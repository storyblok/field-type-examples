import { FunctionComponent, ReactNode } from 'react'
import { css } from '@emotion/react'
import { red_25, sb_dark_blue } from '../storyblok-design'

export const ErrorAlert: FunctionComponent<{
  title?: ReactNode
  children?: ReactNode
}> = (props) => (
  <div
    css={css({
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',

      backgroundColor: red_25,
      padding: '15px',
      borderRadius: '5px',

      color: sb_dark_blue,
    })}
  >
    <h1
      css={css({
        fontSize: '1em',
      })}
    >
      {props.title}
    </h1>
    <p>{props.children}</p>
  </div>
)
