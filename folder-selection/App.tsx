import FieldPlugin from './components/FieldPlugin'
import { FunctionComponent } from 'react'
import { FieldPluginProvider } from '@storyblok/field-plugin/react'

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { lightTheme } from '@storyblok/mui'

const App: FunctionComponent = () => {
  return (
    <FieldPluginProvider
      Loading={Loading}
      Error={Error}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: 'transparent' },
          }}
        />
        <FieldPlugin />
      </ThemeProvider>
    </FieldPluginProvider>
  )
}

const Loading: FunctionComponent = () => <p>Loading...</p>
const Error: FunctionComponent<{ error: Error }> = (props) => {
  console.error(props.error)
  return <p>An error occured, please see the console for more details.</p>
}
export default App
