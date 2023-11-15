export type ValidationResult<T> =
  | {
      value: undefined
      error: string
    }
  | {
      value: T
      error: undefined
    }
