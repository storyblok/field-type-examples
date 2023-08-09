import { FieldPluginResponse } from '@storyblok/field-plugin'
import { useContext } from 'react'
import { FieldPluginContext } from './FieldPluginProvider'

export const useFieldPlugin = (): Extract<
  FieldPluginResponse,
  { type: 'loaded' }
> => {
  const plugin = useContext(FieldPluginContext)
  if (!plugin) {
    throw new Error(
      'The plugin is not loaded, yet `useFieldPlugin()` was invoked. Ensure that the component that invoked `useFieldPlugin()` is wrapped within `<FieldPluginProvider>`.',
    )
  }

  return plugin
}
