import { PluginOptions } from './options'

export type EcommerceOptions<
  Props extends Record<string, string> = Record<string, string>,
> = PluginOptions<
  {
    // The maximum number of items that can be added
    limit?: string
    // Limit the end-user from only selecting either categories or products
    selectOnly?: string
  } & Props
>
