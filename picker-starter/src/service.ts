import { StoryblokIcon } from './components'
import { PickerPluginParams } from '@/domain'
import { platform } from './platform'
import { optionsExample, optionsSchema } from './options-schema'

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
