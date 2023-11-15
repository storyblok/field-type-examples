import {
  BasketItem,
  CursorPaginatedPageInfo,
  ItemQueryParams,
  MultiOption,
  PagePaginatedPageInfo,
} from '../../../../ecommerce'

export type State = {
  loadingState:
    | 'notLoading'
    | 'loadingOptions'
    | 'loadingNewPage' // Results will replace current list of items
    | 'loadingMore' // Results will append current list of items
  query: ItemQueryParams
  items: BasketItem[]
  userOptions: MultiOption[]
  pageInfo: PagePaginatedPageInfo | CursorPaginatedPageInfo | undefined
}
