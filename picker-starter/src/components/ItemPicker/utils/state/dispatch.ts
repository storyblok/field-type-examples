import { State } from './types/State'
import {
  Action,
  ReceiveItemsAction,
  ReceiveUserOptionsAction,
} from './types/Action'
import { isCursorPaginatedResult, isPagePaginatedResult } from '@/core'
import { defaultPerPage } from '@/settings'

export const firstPagePagination = {
  page: 1,
  per_page: defaultPerPage,
  cursor: undefined,
}

export type Dispatch = (state: State, action: Action) => State
export const dispatch: Dispatch = (state, action) => {
  switch (action.type) {
    case 'requestUserOptions':
      return {
        ...state,
        loadingState: 'loadingOptions',
      }
    case 'receiveUserOptions':
      return dispatchReceiveUserOptions(state, action)
    case 'receiveItems':
      return dispatchReceiveItems(state, action)
    case 'receiveError':
      return {
        ...state,
        loadingState: 'notLoading',
      }
    case 'loadMore':
      if (!isCursorPaginatedResult(state.pageInfo)) {
        // Cannot load more
        return state
      }
      return {
        ...state,
        loadingState: 'loadingMore',
        query: {
          ...state.query,
          cursor: state.pageInfo?.endCursor,
        },
      }
    case 'loadPage':
      if (!isPagePaginatedResult(state.pageInfo)) {
        // Cannot load specific page
        return state
      }
      return {
        ...state,
        loadingState: 'loadingNewPage',
        query: {
          ...state.query,
          page: action.page,
        },
      }
    case 'setUserOption':
      return {
        ...state,
        loadingState: 'loadingNewPage',
        query: {
          ...state.query,
          userOptions: {
            ...state.query.userOptions,
            [action.name]: action.value,
          },
          // Reset pagination
          ...firstPagePagination,
        },
      }
    case 'setSearchTerm':
      return {
        ...state,
        loadingState: 'loadingNewPage',
        query: {
          ...state.query,
          // New search string
          search_term: action.searchTerm,
          // Reset pagination
          ...firstPagePagination,
        },
      }
  }
}
const dispatchReceiveUserOptions = (
  state: State,
  action: ReceiveUserOptionsAction,
): State => {
  // Set the default values
  const defaultUserOptionValues = action.userOptions.reduce(
    (previousValue, currentValue) => {
      return {
        ...previousValue,
        [currentValue.name]: currentValue.defaultValue,
      }
    },
    {},
  )
  return {
    ...state,
    loadingState: 'loadingNewPage',
    userOptions: action.userOptions,
    query: {
      ...state.query,
      userOptions: defaultUserOptionValues,
    },
  }
}
const dispatchReceiveItems = (
  state: State,
  action: ReceiveItemsAction,
): State => {
  const { response } = action
  if (state.loadingState === 'loadingMore') {
    return {
      ...state,
      loadingState: 'notLoading',
      pageInfo: response.pageInfo,
      items: [...state.items, ...response.items],
    }
  }
  return {
    ...state,
    ...response,
    loadingState: 'notLoading',
  }
}
