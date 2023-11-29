import { State } from '../state/types/State'
import { isPagePaginatedResult } from '@/core'

export const showPagePagination = (state: State): boolean =>
  isPagePaginatedResult(state.pageInfo) &&
  typeof state.pageInfo.totalCount !== 'undefined'
