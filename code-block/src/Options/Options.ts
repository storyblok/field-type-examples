import { z, ZodSchema } from 'zod'
import { defaultHighlightStateOptionValue } from './defaultHighlightStateOptionValue'

export type CodeBlockOptions = {
  highlightStates?: HighlightStateOptions
  enableTitle: boolean
  enableLineNumberStart: boolean
  languages?: [string, ...string[]]
}

const HighlightStateOptionSchema = z
  .array(
    z.object({
      value: z.string(),
      color: z.string(),
    }),
  )
  .nonempty()
  .optional()
  .transform((highlightStates) =>
    typeof highlightStates === 'undefined'
      ? undefined
      : ([
          defaultHighlightStateOptionValue,
          ...highlightStates,
        ] as HighlightStateOptions),
  )

const LanguagesOptionSchema = z.array(z.string()).nonempty().optional()

export type HighlightStateOption = {
  value: string
  color: string
}

export type HighlightStateOptions = [
  HighlightStateOption,
  ...HighlightStateOption[],
]

/**
 * Even though it's trivial, it improves code readability
 * @param options
 */
export const defaultHighlightStateOption = (
  options: HighlightStateOptions,
): HighlightStateOption => options[0]

// The next minor version after zod@3.21.4 will eliminate the need of `name`: https://github.com/colinhacks/zod/pull/2426
const optionalJsonPreprocessor = (name: string) => (data: unknown) => {
  if (typeof data === 'undefined') {
    return undefined
  }
  if (typeof data !== 'string') {
    return new Error(`Failed to parse "${name}" because it is not a string`)
  }
  if (data === '') {
    return undefined
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    throw new Error(`Failed to parse "${name}" because it is not a valid JSON`)
  }
}

const optionsSchema = z.object({
  enableTitle: z.preprocess(
    optionalJsonPreprocessor('enableTitle'),
    z.boolean().optional().default(false),
  ),
  enableLineNumberStart: z.preprocess(
    optionalJsonPreprocessor('enableLineNumberStart'),
    z.boolean().default(false),
  ),
  highlightStates: z
    .preprocess(
      optionalJsonPreprocessor('highlightStates'),
      HighlightStateOptionSchema,
    )
    .optional(),
  languages: z
    .preprocess(optionalJsonPreprocessor('languages'), LanguagesOptionSchema)
    .optional(),
})

/**
 * `z.safeParse` is not completely safe, because if the processor in
 *  `z.preprocess()` throw an exception, `safeParse` will throw that error
 * @param schema
 * @param data
 */
const superSafeParse = <Schema extends ZodSchema>(
  schema: Schema,
  data: unknown,
): Error | z.infer<Schema> => {
  try {
    const res = schema.safeParse(data)
    if (!res.success) {
      return res.error
    } else {
      return res.data
    }
  } catch (e) {
    return new Error(
      `Failed to parse options: ${
        e instanceof Error ? e.message : 'Unknown reason'
      }`,
    )
  }
}

export const parseOptions = (data: unknown): CodeBlockOptions | Error =>
  superSafeParse(optionsSchema, data)
