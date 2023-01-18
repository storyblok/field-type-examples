export const xCoordinateFromValue = (
  value: number,
  width: number,
  minValue: number,
  maxValue: number,
): number => {
  return ((value - minValue) * width) / (maxValue - minValue)
}
