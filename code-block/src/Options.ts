import { z } from 'zod'

const OptionsSchema = z.object({
  lineStates: z.string().optional(),
})

export type Options = z.infer<typeof OptionsSchema>

const LineStateOptionSchema = z.array(
  z.object({
    value: z.string(),
    color: z.string(),
  }),
)

export type LineStateOption = z.infer<typeof LineStateOptionSchema>[number]
export type LineStateOptions = [LineStateOption, ...LineStateOption[]]

export const defaultLineStateOption = {
  value: '',
  color: 'transparent',
}

export const lineStateOptionFromOptions = (
  data: unknown,
): LineStateOptions | Error => {
  const options = OptionsSchema.safeParse(data)
  if (!options.success) {
    return options.error
  }
  if (
    typeof options.data.lineStates === 'undefined' ||
    options.data.lineStates === ''
  ) {
    return [defaultLineStateOption]
  }
  try {
    const lineStates = LineStateOptionSchema.safeParse(
      JSON.parse(options.data.lineStates),
    )
    if (!lineStates.success) {
      return lineStates.error
    }
    // TODO unique
    return [defaultLineStateOption, ...lineStates.data]
  } catch (e) {
    return e instanceof Error ? e : new Error('unknown error parsing options')
  }
}
