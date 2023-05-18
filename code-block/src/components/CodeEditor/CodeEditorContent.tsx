import { z } from 'zod'

export const defaultLineState = ''
export const lineStates = ['', '0', '+', '-'] as const

const CodeEditorContentSchema = z.object({
  code: z.string(),
  lineStates: z.array(z.string()),
})

export type CodeEditorContent = z.infer<typeof CodeEditorContentSchema>

export const parseCodeEditorState = (data: unknown): CodeEditorContent => {
  const content = CodeEditorContentSchema.safeParse(data)
  if (!content.success) {
    return {
      code: '',
      lineStates: [],
    }
  }

  return content.data
}

export type LineState = CodeEditorContent['lineStates'][number]
