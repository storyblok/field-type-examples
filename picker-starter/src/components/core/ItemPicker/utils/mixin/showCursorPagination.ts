import { State } from '../state/types/State'
import { isCursorPaginatedResult } from '../../../ecommerce'

export const showCursorPagination = (state: State): boolean =>
  isCursorPaginatedResult(state.pageInfo) &&
  typeof state.pageInfo.endCursor !== 'undefined'
