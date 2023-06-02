import {
  defaultHighlightStateOption,
  HighlightStateOptions,
} from '../../Options'

export const colorFromHighlightState = (
  highlightStateOptions: HighlightStateOptions,
  highlightState: string,
): string => {
  const defaultColor = defaultHighlightStateOption(highlightStateOptions).color
  return (
    highlightStateOptions.find((it) => it.value === highlightState)?.color ??
    defaultColor
  )
}
