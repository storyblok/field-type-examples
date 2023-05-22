import { LineStateOptions } from '../../Options'

export const colorFromLineState = (
  lineStateOptions: LineStateOptions,
  lineState: string,
): string => {
  const defaultColor = lineStateOptions[0].color
  return (
    lineStateOptions.find((it) => it.value === lineState)?.color ?? defaultColor
  )
}
