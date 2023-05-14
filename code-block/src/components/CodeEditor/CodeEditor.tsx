import { FunctionComponent } from 'react'
import {
  OnBeforeChange,
  SyncedCodeMirror,
} from '../SyncedCodeMirror'

import styles from './CodeEditor.module.scss'
import './storyblok-theme.scss'

export const CodeEditor: FunctionComponent<{
  content: string
  setContent: (content: string) => void
}> = (props) => {
  const { content, setContent } = props

  const onBeforeChange: OnBeforeChange = (editor, data, value) => setContent(value)

  return (
    <SyncedCodeMirror
      className={styles.codeEditor}
      options={{
        theme: 'storyblok',
        lineNumbers: true,
        indentWithTabs: false,
        tabSize: 2,
      }}
      value={content}
      onBeforeChange={onBeforeChange}
    />
  )
}
