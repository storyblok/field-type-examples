/**
 * The props that are passed to the top-level component
 */
export type WrapperPluginProps = {
  name: string
  isModalOpen: boolean
  setModalOpen: (value: boolean) => void
  options: Record<string, string | undefined>
  setValue: (value: Record<string, unknown>) => void
  value: Record<string, unknown> // TODO generic type for output
  spaceId: number | null // or is it number?
  token: string | null
}
