export const createRootElement = (id?: string): HTMLElement => {
  const rootElement = document.createElement('div')
  rootElement.id = id ?? 'app'
  return rootElement
}
