import { FieldPluginResponse } from '@storyblok/field-plugin'
import { inject } from 'vue'

export function useFieldPlugin() {
  const plugin = inject<FieldPluginResponse>(
    'field-plugin',
    () => {
      throw new Error(
        `You need to wrap your app with \`<FieldPluginProvider>\` component.`,
      )
    },
    true,
  )

  if (plugin.type !== 'loaded') {
    throw new Error(
      'The plugin is not loaded, yet `useFieldPlugin()` was invoked. Ensure that the component that invoked `useFieldPlugin()` is wrapped within `<FieldPluginProvider>`, and that it is placed within the default slot.'
    )
  }

  return plugin as Extract<FieldPluginResponse, { type: 'loaded' }>
}
