import { getProductFilters, queryCategories, queryProducts } from '@/data'
import { defineConfig } from '@/core'
import { StoryblokIcon } from './components'
import { optionsSchema } from './options-schema'

export default defineConfig((options) => {
  return {
    title: 'Picker Starter',
    icon: StoryblokIcon,
    options: {
      example: {
        limit: '10',
        selectOnly: 'product',
      },
      validate: () => {
        const validationResult = optionsSchema.validate(options, {
          abortEarly: false,
        })

        return {
          isValid: !validationResult.error,
          error: validationResult.error?.message,
        }
      },
    },
    tabs: [
      {
        name: 'product',
        label: 'Products',
        query: queryProducts,
        getFilters: getProductFilters,
      },
      {
        name: 'category',
        label: 'Categories',
        query: queryCategories,
      },
    ],
  }
})
