import { z } from 'zod'

const OptionsSchema = z.object({
  colorFromLineState: z.string().optional(),
})

export const Options = z.infer<typeof OptionsSchema>

const LineStatesSchema = z.array(
  z.object({
    value: z.string(),
    color: z.string(),
  }),
)

export const colorFromLineStateLineStateFromOptions = (data: unknown) => {
  const options = OptionsSchema.safeParse(data)
  if (!options.success) {
    return options.error
  }
  if (typeof options.data.colorFromLineState === 'undefined') {
    return undefined
  }
  try {
    const lineStates = LineStatesSchema.safeParse(
      JSON.parse(options.data.colorFromLineState),
    )
    if (!lineStates.success) {
      return lineStates.error
    }
    return lineStates.data
  } catch (e) {
    return e instanceof Error ? e : new Error('unknown error parsing options')
  }
}
