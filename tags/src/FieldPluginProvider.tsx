import {
  FunctionComponent,
  createContext,
  useEffect,
  useState,
  ComponentType,
} from 'react'
import {
  type FieldPluginResponse,
  createFieldPlugin,
} from '@storyblok/field-plugin'
import { ReactNode } from 'react'

export const FieldPluginContext = createContext<
  Extract<FieldPluginResponse, { type: 'loaded' }> | undefined
>(undefined)

type Props = {
  Error?: ComponentType<{ error: Error }>
  Loading?: ComponentType
  children?: ReactNode
}

export const FieldPluginProvider: FunctionComponent<Props> = ({
  Error,
  Loading,
  children,
}) => {
  const [state, setState] = useState<FieldPluginResponse>({
    type: 'loading',
  })

  useEffect(() => createFieldPlugin(setState), [])

  if (state.type === 'loading') {
    return Loading ? <Loading /> : <></>
  } else if (state.type === 'error') {
    return Error ? <Error error={state.error} /> : <></>
  } else {
    return (
      <FieldPluginContext.Provider value={state}>
        {children}
      </FieldPluginContext.Provider>
    )
  }
}
