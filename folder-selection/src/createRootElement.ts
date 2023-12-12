export const createRootElement = (id?: string): HTMLElement => {
  // In production, `#app` may or may not exist.
  /* eslint-disable functional/immutable-data */
  const rootElement = document.createElement('div')
  rootElement.id = id ?? 'app'
  return rootElement
}
