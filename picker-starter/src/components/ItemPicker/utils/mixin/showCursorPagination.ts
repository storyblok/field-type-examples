import { State } from '../state/types/State'
import { isCursorPaginatedResult } from '@/core'

export const showCursorPagination = (state: State): boolean =>
  isCursorPaginatedResult(state.pageInfo) && state.pageInfo.hasNextPage
