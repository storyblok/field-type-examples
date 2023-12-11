import { BasketItem } from './basket/BasketItem'
import { Component } from 'vue'

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

export type UnpaginatedResult<Item> = {
  pageInfo: undefined
  items: Item[]
}

export type PagePaginatedResult<Item> = {
  pageInfo: PagePaginatedPageInfo
  items: Item[]
}

export type CursorPaginatedResult<Item> = {
  pageInfo: CursorPaginatedPageInfo
  items: Item[]
}

export type PickerServiceValidationResult =
  | {
      value: undefined
      error: string
    }
  | {
      value: PickerService
      error: undefined
    }

export type ItemQueryParams = {
  perPage: number
  searchTerm: string
  filterSelection: Record<string, string | string[]>
  cursor: string | undefined
  page: number
}

export type FilterList = () => Promise<FilterItem[]>

/**
 * Describes a select input field.
 */
export type FilterItem = {
  type: 'single' | 'multi'
  label: string
  name: string
  defaultValue: string | string[] | undefined
  options: FilterOption[]
}

export type FilterOption = {
  value: string
  label: string
}

export type PickerPlatform<ServiceParams> = (
  serviceParams: ServiceParams,
) => PickerService

export type ItemQuery = (
  params: ItemQueryParams,
) => Promise<QueryResponse<BasketItem>>

export type TabItem = {
  name: string
  label: string
  query: ItemQuery // TODO rename propery
  getFilters?: FilterList
}

export type PickerService = {
  tabs: TabItem[]
}

export type PickerPluginParams = {
  title?: string
  icon?: Component
  makeService: (props: unknown) => PickerServiceValidationResult
}

export type OptionsParams = Record<string, string>
