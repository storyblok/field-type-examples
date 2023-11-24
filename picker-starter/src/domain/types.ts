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
      exampleOptions: Record<string, string>
      value: undefined
      error: string
    }
  | {
      exampleOptions: Record<string, string>
      value: PickerService
      error: undefined
    }

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

export type PickerService = {
  itemServices: ItemService[]
}

export type PickerPluginParams = {
  title?: string
  icon?: Component
  makeService: (props: unknown) => PickerServiceValidationResult
}
