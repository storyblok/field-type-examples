export const valueFromCoordinate = (
  x: number,
  width: number,
  minValue: number,
  maxValue: number,
): number => {
  return (x * (maxValue - minValue)) / width + minValue
}
