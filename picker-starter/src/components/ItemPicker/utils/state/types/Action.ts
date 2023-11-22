import { BasketItem, MultiOption, QueryResponse } from '@/domain'

export type ReceiveItemsAction = {
  type: 'receiveItems'
  response: QueryResponse<BasketItem>
}
export type ReceiveUserOptionsAction = {
  type: 'receiveUserOptions'
  userOptions: MultiOption[]
}
export type Action =
  | {
      type: 'requestUserOptions'
    }
  | ReceiveUserOptionsAction
  | ReceiveItemsAction
  | {
      type: 'receiveError'
      error: Error
    }
  | {
      type: 'setUserOption'
      name: string
      value: string | string[]
    }
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
