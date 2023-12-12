import { getItemFilters, queryCategories, queryItems } from '@/data'
import { defineConfig } from '@/core'
import { StoryblokIcon } from './components'

export default defineConfig((options) => {
  return {
    title: 'Picker Starter',
    icon: StoryblokIcon,
    validateOptions: () => {
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
    tabs: [
      {
        name: 'items',
        label: 'Items',
        query: queryItems,
        getFilters: getItemFilters,
      },
      {
        name: 'category',
        label: 'Categories',
        query: queryCategories,
      },
    ],
  }
})
