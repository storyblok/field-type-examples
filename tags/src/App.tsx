import { FunctionComponent } from 'react'
import { FieldPluginProvider } from './FieldPluginProvider'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '@storyblok/mui'
import Tag from './components/Tag'

const App: FunctionComponent = () => {
  return (
    <FieldPluginProvider
      Loading={Loading}
      Error={Error}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Tag />
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
