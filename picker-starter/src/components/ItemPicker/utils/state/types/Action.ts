import { BasketItem, FilterItem, QueryResponse } from '@/core'

export type ReceiveItemsAction = {
  type: 'receiveItems'
  response: QueryResponse<BasketItem>
}

export type ReceiveFiltersAction = {
  type: 'receiveFilters'
  filterList: FilterItem[]
}

export type RequestFiltersAction = {
  type: 'requestFilters'
}

export type SetUserSelectionAction = {
  type: 'setFilterSelection'
  name: string
  value: string | string[]
}

export type Action =
  | RequestFiltersAction
  | ReceiveFiltersAction
  | ReceiveItemsAction
  | {
      type: 'receiveError'
      error: Error
    }
  | SetUserSelectionAction
  | {
      type: 'loadMore'
    }
  | {
      type: 'loadPage'
      page: number
    }
  | {
      type: 'setSearchTerm'
      searchTerm: string
    }
