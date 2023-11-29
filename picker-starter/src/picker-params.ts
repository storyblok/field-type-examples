import { StoryblokIcon } from './components'
import { PickerPluginParams } from '@/core'
import { optionsExample, optionsSchema } from './options-schema'
import { platform } from './plataform'

export const servicePluginParams: PickerPluginParams = {
  title: 'Picker Starter',
  icon: StoryblokIcon,
  makeService: (props: unknown) => {
    const validationResult = optionsSchema.validate(props, {
      abortEarly: false,
    })

    return validationResult.error
      ? {
          exampleOptions: optionsExample,
          error: validationResult.error.message,
        }
      : {
          exampleOptions: optionsExample,
          value: platform(validationResult.value),
        }
  },
}
