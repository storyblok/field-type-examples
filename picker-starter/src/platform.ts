import { OptionsParams, PickerPlatform } from './core'
import { getProductFilters, queryCategories, queryProducts } from './data'

export const platform: PickerPlatform<OptionsParams> = (options) => ({
  itemServices: [
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
})
