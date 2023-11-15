import Joi from 'joi'
import { EcommercePluginParams, StoryblokIcon } from './components/core'

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

export const mockPluginParams: EcommercePluginParams = {
  title: 'Picker Starter',
  icon: StoryblokIcon,
  makeECommerceService: (props) => {
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
          value: [
            {
              name: 'product',
              label: 'Products',
              query: () => ({
                items: [],
                pageInfo: {
                  totalCount: 10,
                },
              }),
              getOptions: () => ({
                label: 'option 1',
                value: 'value 1',
              }),
            },
            {
              name: 'category',
              label: 'Categories',
              query: () => ({
                items: [],
                pageInfo: {
                  totalCount: 10,
                },
              }),
            },
          ],
        }
  },
}
