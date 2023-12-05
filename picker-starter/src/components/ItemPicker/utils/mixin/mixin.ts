import { State } from '../state/types/State'
import { Action } from '../state/types/Action'
import { dispatch, firstPagePagination } from '../state/dispatch'
import { isLoadingItems } from './isLoadingItems'
import { disableLoadMore } from './disableLoadMore'
import { isPageEmpty } from './isPageEmpty'
import { showCursorPagination } from './showCursorPagination'
import { showPagePagination } from './showPagePagination'

type ReducerData = {
  queryState: State
}

export type ReducerMixin = {
  data(): { queryState: State }
  computed: {
    isLoadingItems(this: ReducerData): boolean
    disableLoadMore(this: ReducerData): boolean
    isPageEmpty(this: ReducerData): boolean
    showCursorPagination(this: ReducerData): boolean
    showPagePagination(this: ReducerData): boolean
  }
  methods: {
    dispatch(this: ReducerData, action: Action): void
  }
}

const initialState: State = {
  loadingState: 'loadingFilters',
  query: {
    searchTerm: '',
    filterSelection: {},
    ...firstPagePagination,
  },
  items: [],
  filterList: [],
  pageInfo: undefined,
}

export const reducerMixin: ReducerMixin = {
  data() {
    return {
      queryState: initialState,
    }
  },
  computed: {
    isLoadingItems() {
      return isLoadingItems(this.queryState)
    },
    disableLoadMore() {
      return disableLoadMore(this.queryState)
    },
    isPageEmpty() {
      return isPageEmpty(this.queryState)
    },
    showCursorPagination() {
      return showCursorPagination(this.queryState)
    },
    showPagePagination() {
      return showPagePagination(this.queryState)
    },
  },
  methods: {
    dispatch(action) {
      this.queryState = {
        ...this.queryState,
        ...dispatch(this.queryState, action),
      }
    },
  },
}
