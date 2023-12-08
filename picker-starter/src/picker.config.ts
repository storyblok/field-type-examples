import { getProductFilters, queryCategories, queryProducts } from '@/data'
import { defineConfig } from '@/core'
import { StoryblokIcon } from './components'

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
        const { limit } = options

        const isLimitOptionValid = limit === undefined || Number(limit) > 0

        if (!isLimitOptionValid) {
          return {
            isValid: false,
            error: `The 'limit' option must be an integer greater than 0`,
          }
        }

        return {
          isValid: true,
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
