import { CursorPaginatedPageInfo, PagePaginatedPageInfo } from '.'
import { hasKey } from '../utils'

export const isPagePaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is PagePaginatedPageInfo => hasKey(pageInfo, 'totalCount')

export const isCursorPaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is CursorPaginatedPageInfo => hasKey(pageInfo, 'endCursor')

export const isUnpaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is undefined => typeof pageInfo === 'undefined'
