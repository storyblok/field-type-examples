import Joi from 'joi'

export type MockPluginOptions = {
  // The maximum number of items that can be added
  limit?: string
  // Limit the end-user from only selecting either categories or products
  selectOnly?: string
}

const optionsSchemaMixin: Joi.StrictSchemaMap<MockPluginOptions> = {
  limit: Joi.string()
    .regex(/^[1-9][0-9]*$/)
    .optional()
    .messages({
      'string.pattern.base': '"limit" must be an integer greater than 0',
    }),
  selectOnly: Joi.string().valid('category', 'product').optional(),
}

export const optionsSchema = Joi.object<MockPluginOptions, true>({
  ...optionsSchemaMixin,
}).unknown(true)
