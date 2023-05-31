import { FieldPluginData } from '@storyblok/field-plugin'
import { z } from 'zod'

const RawOptionsSchema = z.object({
  highlightStates: z.string().optional(),
  enableTitle: z.enum(['', 'true', 'false']).optional(),
  enableLineNumberStart: z.enum(['', 'true', 'false']).optional(),
  languages: z.string().optional(),
})

type RawOptions = z.infer<typeof RawOptionsSchema>

export type CodeBlockOptions = {
  highlightStates?: HighlightStateOptions
  enableTitle: boolean
  enableLineNumberStart: boolean
  languages: string[]
}

const HighlightStateOptionSchema = z.array(
  z.object({
    value: z.string(),
    color: z.string(),
  }),
)

const LanguagesOptionSchema = z.array(z.string())

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
  rawOptions: RawOptions,
): CodeBlockOptions['highlightStates'] | undefined | Error => {
  if (
    typeof rawOptions.highlightStates === 'undefined' ||
    rawOptions.highlightStates === ''
  ) {
    return undefined
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
    return new Error(
      `Error parsing "highlightStates" option: ${
        e instanceof Error ? e.message : 'unknown error'
      }`,
    )
  }
}

const languagesOptionFromOptions = (
  rawOptions: RawOptions,
): CodeBlockOptions['languages'] | Error => {
  if (
    typeof rawOptions.languages === 'undefined' ||
    rawOptions.languages === ''
  ) {
    return []
  }
  try {
    const languages = LanguagesOptionSchema.safeParse(
      JSON.parse(rawOptions.languages),
    )
    if (!languages.success) {
      return languages.error
    }
    return languages.data.sort((a, b) => a.localeCompare(b))
  } catch (e) {
    return new Error(
      `Error parsing "languages" option: ${
        e instanceof Error ? e.message : 'unknown error'
      }`,
    )
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
  const languages = languagesOptionFromOptions(rawOptions.data)
  if (languages instanceof Error) {
    return languages
  }
  return {
    highlightStates,
    enableTitle: rawOptions.data.enableTitle === 'true',
    enableLineNumberStart: rawOptions.data.enableLineNumberStart === 'true',
    languages,
  }
}
