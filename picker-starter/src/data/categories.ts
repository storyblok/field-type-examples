import { CategoryItem, ItemQuery } from '@/core'
import { compareName, delayed, randomDelay } from '@/utils'

export type MockCategory = {
  name: string
  description?: string
}

// TODO this should become a tree
export const categoryMockAssets: MockCategory[] = [
  {
    name: 'Kitchen',
    description:
      'Knives, forks, spoons... and everything else that you can think of for your home kitchen!',
  },
  {
    name: 'Food',
    description: 'Yummy things for your tummy!',
  },
  {
    name: 'Beverages',
    description: 'Beeeeeeer',
  },
  {
    name: 'Electronics',
  },
  {
    name: 'Clothing',
  },
  {
    name: 'Books',
  },
  {
    name: 'Home Decor',
  },
  {
    name: 'Literature',
  },
  {
    name: 'Hygiene',
    description: 'Take care of yourself',
  },
]

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

export const queryCategories: ItemQuery = async () => {
  const response = {
    items: allCategories,
    pageInfo: {
      totalCount: allCategories.length,
    },
  }

  // It mimics an API call by adding a delay before return the data.
  return delayed(randomDelay(), response)
}
