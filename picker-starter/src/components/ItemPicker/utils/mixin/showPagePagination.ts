import { defaultPerPage } from '@/settings'
import { State } from '../state/types/State'
import { isPagePaginatedResult } from '@/core'

export const showPagePagination = (state: State): boolean =>
  isPagePaginatedResult(state.pageInfo) &&
  Number.isInteger(state.pageInfo.totalCount) &&
  state.pageInfo.totalCount > defaultPerPage
