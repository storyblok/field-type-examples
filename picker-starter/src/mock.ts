import Joi from 'joi'
import { StoryblokIcon } from './components'
import { PickerPluginParams } from './domain'

type MockPluginOptions = {
  // The maximum number of items that can be added
  limit?: string
}

const optionsSchemaMixin: Joi.StrictSchemaMap<MockPluginOptions> = {
  limit: Joi.string()
    .regex(/^[1-9][0-9]*$/)
    .optional()
    .messages({
      'string.pattern.base': '"limit" must be an integer greater than 0',
    }),
}

export const optionsSchema = Joi.object<MockPluginOptions, true>({
  ...optionsSchemaMixin,
}).unknown(true)

const optionsExample: MockPluginOptions = {
  limit: '10',
}

export const mockPluginParams: PickerPluginParams = {
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
          value: {
            itemServices: [
              {
                name: 'product',
                label: 'Products',
                query: async () => ({
                  items: [],
                  pageInfo: {
                    totalCount: 10,
                  },
                }),
                getOptions: async () => [
                  {
                    type: 'single',
                    label: 'Category',
                    options: [
                      {
                        label: 'Option 1',
                        value: 'Value 1',
                      },
                    ],
                    defaultValue: undefined,
                    name: 'category',
                  },
                ],
              },
              {
                name: 'variations',
                label: 'Variations',
                query: async () => ({
                  items: [],
                  pageInfo: {
                    totalCount: 10,
                  },
                }),
              },
              {
                name: 'category',
                label: 'Categories',
                query: async () => ({
                  items: [],
                  pageInfo: {
                    totalCount: 10,
                  },
                }),
              },
            ],
          },
        }
  },
}
