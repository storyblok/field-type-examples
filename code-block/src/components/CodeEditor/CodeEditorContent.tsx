import { z } from 'zod'

const CodeEditorContentSchema = z.object({
  code: z.string(),
  highlightStates: z.array(z.string()),
  title: z.string().optional(),
  lineNumberStart: z.number().optional(),
})

export type CodeEditorContent = z.infer<typeof CodeEditorContentSchema>

export const parseCodeEditorState = (data: unknown): CodeEditorContent => {
  const content = CodeEditorContentSchema.safeParse(data)
  if (!content.success) {
    return {
      code: '',
      highlightStates: [''],
    }
  }

  return content.data
}

export type HighlightState = CodeEditorContent['highlightStates'][number]
