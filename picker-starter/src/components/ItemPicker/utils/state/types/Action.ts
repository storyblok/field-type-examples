import { BasketItem, FilterItem, QueryResponse } from '@/core'

export type RequestFiltersAction = {
  type: 'requestFilters'
}

export type ReceiveItemsAction = {
  type: 'receiveItems'
  response: QueryResponse<BasketItem>
}

export type ReceiveFiltersAction = {
  type: 'receiveFilters'
  filterList: FilterItem[]
}

export type ReceiveErrorAction = {
  type: 'receiveError'
  error: Error
}

export type LoadMoreAction = {
  type: 'loadMore'
}

export type LoadPageAction = {
  type: 'loadPage'
  page: number
}

export type SetUserSelectionAction = {
  type: 'setFilterSelection'
  name: string
  value: string | string[]
}

export type SetSearchTermAction = {
  type: 'setSearchTerm'
  searchTerm: string
}

export type Action =
  | RequestFiltersAction
  | ReceiveFiltersAction
  | ReceiveItemsAction
  | ReceiveErrorAction
  | SetUserSelectionAction
  | LoadMoreAction
  | LoadPageAction
  | SetSearchTermAction
