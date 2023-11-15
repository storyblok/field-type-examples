import { State } from '../state/types/State'
import { isCursorPaginatedResult } from '../../../ecommerce'

export const disableLoadMore = (state: State): boolean =>
  isCursorPaginatedResult(state.pageInfo) && !state.pageInfo.hasNextPage
