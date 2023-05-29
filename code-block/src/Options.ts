import { FieldPluginData } from '@storyblok/field-plugin'
import { z } from 'zod'

const RawOptionsSchema = z.object({
  highlightStates: z.string().optional(),
  enableTitle: z.enum(['', 'true', 'false']).optional(),
  enableLineNumberStart: z.enum(['', 'true', 'false']).optional(),
  enableLanguage: z.enum(['', 'true', 'false']).optional(),
})

// TODO do not export
type RawOptionsOptions = z.infer<typeof RawOptionsSchema>

export type CodeBlockOptions = {
  highlightStates: HighlightStateOptions
  enableTitle: boolean
  enableLineNumberStart: boolean
  enableLanguage: boolean
}

const HighlightStateOptionSchema = z.array(
  z.object({
    value: z.string(),
    color: z.string(),
  }),
)

export type HighlightStateOption = z.infer<
  typeof HighlightStateOptionSchema
>[number]

export type HighlightStateOptions = [
  HighlightStateOption,
  ...HighlightStateOption[],
]

export const defaultHighlightStateOption = {
  value: '',
  color: 'transparent',
}

const highlightStatesOptionFromOptions = (
  rawOptions: RawOptionsOptions,
): HighlightStateOptions | Error => {
  if (
    typeof rawOptions.highlightStates === 'undefined' ||
    rawOptions.highlightStates === ''
  ) {
    return [defaultHighlightStateOption]
  }
  try {
    const highlightStates = HighlightStateOptionSchema.safeParse(
      JSON.parse(rawOptions.highlightStates),
    )
    if (!highlightStates.success) {
      return highlightStates.error
    }
    // TODO unique
    return [defaultHighlightStateOption, ...highlightStates.data]
  } catch (e) {
    return e instanceof Error ? e : new Error('unknown error parsing options')
  }
}

export const parseOptions = (
  data: FieldPluginData['options'],
): CodeBlockOptions | Error => {
  const rawOptions = RawOptionsSchema.safeParse(data)
  if (!rawOptions.success) {
    return rawOptions.error
  }
  const highlightStates = highlightStatesOptionFromOptions(rawOptions.data)
  if (highlightStates instanceof Error) {
    return highlightStates
  }
  return {
    highlightStates,
    enableTitle: rawOptions.data.enableTitle === 'true',
    enableLineNumberStart: rawOptions.data.enableLineNumberStart === 'true',
    enableLanguage: rawOptions.data.enableLanguage === 'true',
  }
}
