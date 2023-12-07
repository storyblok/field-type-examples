import { StoryblokIcon } from './components'
import { OptionsParams, PickerPluginParams } from '@/core'
import config from './picker.config'

export const servicePluginParams: PickerPluginParams = {
  title: 'Picker Starter',
  icon: StoryblokIcon,
  makeService: (pluginOptions: unknown) => {
    const { options, tabs } = config(pluginOptions as OptionsParams)

    const validation = options.validate()

    if (!validation.isValid) {
      return {
        exampleOptions: options.example,
        error: validation.error,
      }
    }

    return {
      exampleOptions: options.example,
      value: { tabs },
    }
  },
}
