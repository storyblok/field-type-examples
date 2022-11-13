/**
 * The props to the root component that uses the mixin from the global Storyblok variable
 */
export type RootPluginProps = {
  token: string | undefined | null
  spaceId: number | undefined | null
  options: Record<string, string | undefined>
  name: string
}
