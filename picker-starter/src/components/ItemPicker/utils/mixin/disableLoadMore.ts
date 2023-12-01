import { State } from '../state/types/State'
import { isCursorPaginatedResult } from '@/core'

export const disableLoadMore = (state: State): boolean =>
  isCursorPaginatedResult(state.pageInfo) && !state.pageInfo.hasNextPage
