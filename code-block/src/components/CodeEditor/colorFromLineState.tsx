import {
  defaultHighlightStateOption,
  HighlightStateOptions,
} from '../../Options'

export const colorFromLineState = (
  lineStateOptions: HighlightStateOptions,
  lineState: string,
): string => {
  const defaultColor = defaultHighlightStateOption(lineStateOptions).color
  return (
    lineStateOptions.find((it) => it.value === lineState)?.color ?? defaultColor
  )
}
