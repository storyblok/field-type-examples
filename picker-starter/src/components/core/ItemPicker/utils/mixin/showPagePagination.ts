import { State } from '../state/types/State'
import { isPagePaginatedResult } from '../../../ecommerce'

export const showPagePagination = (state: State): boolean =>
  isPagePaginatedResult(state.pageInfo) &&
  typeof state.pageInfo.totalCount !== 'undefined'
