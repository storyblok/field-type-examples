export type BasketItem<Type extends string = string> = {
  type: Type
  id: string
  name: string
  image: string | undefined
  description: string | undefined
}
