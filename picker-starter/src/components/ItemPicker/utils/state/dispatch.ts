import { State } from './types/State'
import {
  Action,
  ReceiveItemsAction,
  ReceiveFiltersAction,
} from './types/Action'
import { isCursorPaginatedResult, isPagePaginatedResult } from '@/core'
import { defaultPerPage } from '@/settings'

export const firstPagePagination = {
  page: 1,
  perPage: defaultPerPage,
  cursor: undefined,
}

export type Dispatch = (state: State, action: Action) => State
export const dispatch: Dispatch = (state, action) => {
  switch (action.type) {
    case 'requestFilters':
      return {
        ...state,
        loadingState: 'loadingFilters',
      }
    case 'receiveFilters':
      return dispatchReceiveFilterAction(state, action)
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
    case 'setFilterSelection':
      return {
        ...state,
        loadingState: 'loadingNewPage',
        query: {
          ...state.query,
          filterSelection: {
            ...state.query.filterSelection,
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
          searchTerm: action.searchTerm,
          // Reset pagination
          ...firstPagePagination,
        },
      }
  }
}

const initFilterSelectionValues = (action: ReceiveFiltersAction) =>
  action.filterList.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue.name]: currentValue.defaultValue,
    }
  }, {})

const dispatchReceiveFilterAction = (
  state: State,
  action: ReceiveFiltersAction,
): State => {
  const initialFilterSelectionValues = initFilterSelectionValues(action)

  return {
    ...state,
    loadingState: 'loadingNewPage',
    filterList: action.filterList,
    query: {
      ...state.query,
      filterSelection: initialFilterSelectionValues,
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
