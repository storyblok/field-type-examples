import { HighlightStateOptions } from '../../Options'

export const colorFromLineState = (
  lineStateOptions: HighlightStateOptions,
  lineState: string,
): string => {
  const defaultColor = lineStateOptions[0].color
  return (
    lineStateOptions.find((it) => it.value === lineState)?.color ?? defaultColor
  )
}
