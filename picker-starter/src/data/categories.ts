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
