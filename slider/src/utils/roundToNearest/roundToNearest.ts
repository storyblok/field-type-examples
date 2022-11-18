export const roundToNearest = (value: number, multiple: number): number =>
  value - (value % multiple)
