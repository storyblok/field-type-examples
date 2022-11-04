import { Component } from 'vue'
import { WrapperPluginProps } from '@/lib/types/WrapperPluginProps'

export type StoryblokFieldType = {
  name: string
  initialValue: Record<string, unknown>
  Component: Component<WrapperPluginProps>
}
