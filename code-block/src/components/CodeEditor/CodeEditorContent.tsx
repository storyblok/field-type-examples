import { z } from 'zod'

// TODO use 0, -, +
export const lineStates = ['', '0', '+', '-'] as const

const CodeEditorContentSchema = z.object({
  code: z.string(),
  lineStates: z.array(z.enum(lineStates)),
  title: z.string().optional(),
})

export type CodeEditorContent = z.infer<typeof CodeEditorContentSchema>

export const parseCodeEditorState = (data: unknown): CodeEditorContent => {
  const content = CodeEditorContentSchema.safeParse(data)
  if (content.success) {
    return content.data
  } else {
    return {
      code: '',
      lineStates: [],
    }
  }
}

export type LineState = CodeEditorContent['lineStates'][number]
