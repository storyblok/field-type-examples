import { MockItem } from '@/data'

export const matchCategories =
  (categoryNames: string[]) => (items: MockItem) => {
    if (categoryNames.length === 0) {
      return true
    }
    return categoryNames.some((categoryName) => items.category === categoryName)
  }
