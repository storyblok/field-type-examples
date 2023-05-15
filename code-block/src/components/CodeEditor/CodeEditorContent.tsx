import { z } from 'zod'

const CodeEditorContentSchema = z.object({
  code: z.string(),
})

export type CodeEditorContent = z.infer<typeof CodeEditorContentSchema>

export const parseCodeEditorState = (data: unknown): CodeEditorContent => {
  const content = CodeEditorContentSchema.safeParse(data)
  if (content.success) {
    return content.data
  } else {
    return {
      code: '',
    }
  }
}
