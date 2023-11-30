import { OptionsParams, PickerPlatform } from './core'
import { getProductOptions, queryCategories, queryProducts } from './data'

export const platform: PickerPlatform<OptionsParams> = (options) => ({
  itemServices: [
    {
      name: 'product',
      label: 'Products',
      query: queryProducts,
      getOptions: getProductOptions,
    },
    {
      name: 'category',
      label: 'Categories',
      query: queryCategories,
    },
  ],
})
