// A plugin options is always a record of strings to strings
export type PluginOptions<
  Props extends Record<string, string> = Record<string, string>,
> = Props
