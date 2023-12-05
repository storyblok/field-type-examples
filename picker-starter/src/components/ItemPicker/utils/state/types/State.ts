import {
  BasketItem,
  CursorPaginatedPageInfo,
  ItemQueryParams,
  PagePaginatedPageInfo,
  FilterItem,
} from '@/core'

export type State = {
  loadingState:
    | 'notLoading'
    | 'loadingFilters'
    | 'loadingNewPage' // Results will replace current list of items
    | 'loadingMore' // Results will append current list of items
  query: ItemQueryParams
  items: BasketItem[]
  filterList: FilterItem[]
  pageInfo: PagePaginatedPageInfo | CursorPaginatedPageInfo | undefined
}
