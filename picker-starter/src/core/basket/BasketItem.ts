export type BasketItem<Type extends string = string> = {
  type: Type
  id: string
  name: string
  image: string | undefined
  description: string | undefined
}

export type ProductItem = BasketItem<'product'> & {
  sku: string | undefined
}

export type CategoryItem = BasketItem<'category'>
