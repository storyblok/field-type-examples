import { z } from 'zod'

const CodeEditorContentSchema = z.object({
  code: z.string(),
  lineStates: z.array(z.string()),
  title: z.string().optional(),
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
