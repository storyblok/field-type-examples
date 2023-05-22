export const transition = (...properties: string[]) =>
  properties
    .map((property) => `${property} 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`)
    .join(', ')
