import { State } from '../state/types/State'
import { isCursorPaginatedResult } from '@/domain'

export const disableLoadMore = (state: State): boolean =>
  isCursorPaginatedResult(state.pageInfo) && !state.pageInfo.hasNextPage
