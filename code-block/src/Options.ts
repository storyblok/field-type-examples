import { z } from 'zod'

const OptionsSchema = z.object({
  lineStates: z.string().optional(),
})

export const Options = z.infer<typeof OptionsSchema>

const LineStateOptionSchema = z.array(
  z.object({
    value: z.string(),
    color: z.string(),
  }),
)

export type LineStateOption = z.infer<typeof LineStateOptionSchema>

export const lineStateOptionFromOptions = (
  data: unknown,
): LineStateOption | Error => {
  const options = OptionsSchema.safeParse(data)
  if (!options.success) {
    return options.error
  }
  if (typeof options.data.lineStates === 'undefined') {
    return []
  }
  try {
    const lineStates = LineStateOptionSchema.safeParse(
      JSON.parse(options.data.lineStates),
    )
    if (!lineStates.success) {
      return lineStates.error
    }
    return [...lineStates.data]
  } catch (e) {
    return e instanceof Error ? e : new Error('unknown error parsing options')
  }
}
