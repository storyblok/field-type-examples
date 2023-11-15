import { BasketItem } from './BasketItem'
import { hasKey } from '../../../utils'

export type QueryResponse<Item> =
  | UnpaginatedResult<Item>
  | PagePaginatedResult<Item>
  | CursorPaginatedResult<Item>

export type PagePaginatedPageInfo = {
  totalCount: number
}
export type CursorPaginatedPageInfo = {
  endCursor: string
  hasNextPage: boolean
}

type UnpaginatedResult<Item> = {
  pageInfo: undefined
  items: Item[]
}
type PagePaginatedResult<Item> = {
  pageInfo: PagePaginatedPageInfo
  items: Item[]
}
type CursorPaginatedResult<Item> = {
  pageInfo: CursorPaginatedPageInfo
  items: Item[]
}

export const isPagePaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is PagePaginatedPageInfo => hasKey(pageInfo, 'totalCount')

export const isCursorPaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is CursorPaginatedPageInfo => hasKey(pageInfo, 'endCursor')

export const isUnpaginatedResult = (
  pageInfo: undefined | PagePaginatedPageInfo | CursorPaginatedPageInfo,
): pageInfo is undefined => typeof pageInfo === 'undefined'

export type ItemQueryParams = {
  per_page: number
  search_term: string
  userOptions: Record<string, string | string[]> // TODO in generic argument\
  cursor: string | undefined
  // TODO can be undefined(?)
  page: number
}

export type Option = {
  value: string
  label: string
}

/**
 * Describes a select input field.
 */
export type MultiOption = {
  type: 'single' | 'multi'
  label: string
  name: string
  defaultValue: string | string[] | undefined
  options: Option[]
}

export type ECommercePlatform<ServiceParams> = (
  serviceParams: ServiceParams,
) => ECommerceService

export type ItemQuery = (
  params: ItemQueryParams,
) => Promise<QueryResponse<BasketItem>>
export type OptionsQuery = () => Promise<MultiOption[]>

export type ItemService = {
  name: string
  label: string
  query: ItemQuery // TODO rename propery
  getOptions?: OptionsQuery
}

export type ECommerceService = {
  itemServices: ItemService[]
}
