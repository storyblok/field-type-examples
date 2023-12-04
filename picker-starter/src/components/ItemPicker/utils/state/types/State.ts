import {
  BasketItem,
  CursorPaginatedPageInfo,
  ItemQueryParams,
  FilterItem,
  PagePaginatedPageInfo,
} from '@/core'

export type State = {
  loadingState:
    | 'notLoading'
    | 'loadingOptions'
    | 'loadingNewPage' // Results will replace current list of items
    | 'loadingMore' // Results will append current list of items
  query: ItemQueryParams
  items: BasketItem[]
  userOptions: FilterItem[]
  pageInfo: PagePaginatedPageInfo | CursorPaginatedPageInfo | undefined
}
