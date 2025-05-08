import { categories, items } from '@/data'
import { StoryblokIcon } from '@/components'
import { useErrorNotification } from '@/composables'
import { getPage } from '@/utils'
import {
  defineConfig,
  matchCategories,
  matchSearchTerm,
  type TabItemError,
  type PickerConfig,
} from '@/core'

export default defineConfig((options) => {
  const config: PickerConfig = {
    title: 'Picker Starter',
    icon: StoryblokIcon,
  }

  const { setErrorNotification } = useErrorNotification()

  try {
    config.validateOptions = () => {
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
    }

    config.tabs = [
      {
        name: 'items',
        label: 'Items',
        query: async ({ searchTerm, page, perPage, filterSelection }) => {
          const filteredItems = items
            .filter(
              matchCategories(filterSelection['categoryMulti'] as string[]),
            )
            .filter(matchSearchTerm(searchTerm))

          return {
            items: getPage(filteredItems, page, perPage),
            pageInfo: {
              totalCount: filteredItems.length,
            },
          }
        },
        getFilters: async () => {
          return [
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
          ]
        },
        onError: (tabItemError: TabItemError) => {
          const notificationTitle =
            tabItemError.type === 'queryError'
              ? 'Failed to fetch data for the Items tab'
              : 'Failed to create filters for the Items tab'

          setErrorNotification({
            location: 'modal',
            title: notificationTitle,
            message: 'Error: ' + tabItemError.error?.message,
          })

          return false
        },
      },
    ]
  } catch (err) {
    setErrorNotification({
      location: 'main',
      title: 'Plugin could not be initialized: ' + (err as Error).message,
    })
  }

  return config
})
