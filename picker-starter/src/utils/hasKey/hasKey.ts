export const hasKey = <K extends string>(
  obj: unknown,
  key: K,
): obj is { [P in K]: unknown } =>
  typeof obj === 'object' && obj !== null && key in obj
