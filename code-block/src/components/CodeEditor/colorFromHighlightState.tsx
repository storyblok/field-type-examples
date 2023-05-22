import { HighlightStateOptions } from '../../Options'

export const colorFromHighlightState = (
  highlightStateOptions: HighlightStateOptions,
  highlightState: string,
): string => {
  const defaultColor = highlightStateOptions[0].color
  return (
    highlightStateOptions.find((it) => it.value === highlightState)?.color ??
    defaultColor
  )
}
