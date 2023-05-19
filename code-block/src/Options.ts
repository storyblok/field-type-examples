import { z } from 'zod'

const OptionsSchema = z.object({
  highlightStates: z.string().optional(),
})

export type Options = z.infer<typeof OptionsSchema>

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

export const highlightStateOptionFromOptions = (
  data: unknown,
): HighlightStateOptions | Error => {
  const options = OptionsSchema.safeParse(data)
  if (!options.success) {
    return options.error
  }
  if (
    typeof options.data.highlightStates === 'undefined' ||
    options.data.highlightStates === ''
  ) {
    return [defaultHighlightStateOption]
  }
  try {
    const highlightStates = HighlightStateOptionSchema.safeParse(
      JSON.parse(options.data.highlightStates),
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
