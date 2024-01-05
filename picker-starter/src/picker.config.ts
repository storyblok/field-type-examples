import { categories, items } from '@/data'
import { defineConfig, matchCategories, matchSearchTerm } from '@/core'
import { StoryblokIcon } from './components'
import { getPage } from './utils'

export default defineConfig((options) => ({
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
      query: async ({ searchTerm, page, perPage, filterSelection }) => {
        const filteredItems = items
          .filter(matchCategories(filterSelection['categoryMulti'] as string[]))
          .filter(matchSearchTerm(searchTerm))

        return {
          items: getPage(filteredItems, page, perPage),
          pageInfo: {
            totalCount: filteredItems.length,
          },
        }
      },
      getFilters: async () => [
        {
          type: 'multi',
          label: 'Categories',
          name: 'categoryMulti',
          defaultValue: [],
          options: categories.map((category) => ({
            label: category.name,
            value: category.name,
          })),
        },
      ],
    },
  ],
}))
