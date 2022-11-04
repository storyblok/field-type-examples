export type RootPluginComponentMethods = {
  setModalOpen(value: boolean): void
  getPluginName(): string
  initWith(): {
    plugin: string
  } & Record<string, unknown>
  setValue(value: Record<string, unknown>): void
}
