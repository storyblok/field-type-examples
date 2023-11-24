import {
  PickerPlatform,
  ItemQuery,
  MultiOption,
  Option,
  OptionsQuery,
  CategoryItem,
  matchItem,
} from '@/domain'
import { compareName, delayed, getPage } from '@/utils/'
import { MockProduct, products, categoryMockAssets } from './data'

export type MockParams = Record<string, string>

const allCategories: CategoryItem[] = categoryMockAssets
  .map(
    (it) =>
      ({
        type: 'category',
        id: it.name,
        description: undefined,
        image: undefined,
        ...it,
      }) as CategoryItem,
  )
  .sort(compareName)

const getProductOptions: OptionsQuery = async () => {
  const options: Option[] = categoryMockAssets.map<Option>((category) => {
    return {
      label: category.name,
      value: category.name,
    }
  })

  const response: MultiOption[] = [
    {
      type: 'single',
      label: 'Category',
      options: options,
      defaultValue: undefined,
      name: 'category',
    },
    {
      type: 'multi',
      options: options,
      defaultValue: [],
      label: 'Categories',
      name: 'categoryMulti',
    },
  ]

  return delayed(randomDelay(), response)
}

const queryProducts: ItemQuery = async ({
  search_term,
  page,
  per_page,
  userOptions,
}) => {
  const matchCategory =
    (categoryName: undefined | string) => (product: MockProduct) => {
      if (typeof categoryName === 'undefined') {
        return true
      }
      return product.category === categoryName
    }
  const matchCategories =
    (categoryNames: string[]) => (product: MockProduct) => {
      if (categoryNames.length === 0) {
        return true
      }
      return categoryNames.some(
        (categoryName) => product.category === categoryName,
      )
    }

  const allSearchResults = products
    .filter(matchCategory(userOptions['category'] as string | undefined))
    .filter(matchCategories(userOptions['categoryMulti'] as string[]))
    .filter(matchItem(search_term))

  const paginatedResults = getPage(allSearchResults, page, per_page)
  const response = {
    items: paginatedResults,
    pageInfo: {
      totalCount: allSearchResults.length,
    },
  }
  return delayed(randomDelay(), response)
}

const queryCategories: ItemQuery = async () => {
  const response = {
    items: allCategories,
    pageInfo: {
      totalCount: allCategories.length,
    },
  }
  return delayed(randomDelay(), response)
}

const randomDelay = () => 250 + Math.random() * 500

export const platform: PickerPlatform<MockParams> = () => ({
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
