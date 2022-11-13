import type { Component, ComponentOptions } from 'vue'
import type Vue from 'vue'
import { makeStoryblokPluginComponent } from '@/lib/makeStoryblokPluginComponent'
import { WrapperPluginProps } from '@/lib/types'

declare global {
  interface Window {
    Fieldtype: Component
    Storyblok: {
      vue: typeof Vue
      plugin: ComponentOptions<Vue> | typeof Vue
    }
    storyblok: { field_types: Record<string, Component> }
    StoryblokPluginRegistered: boolean
  }
}

const removeDefaultStoryblokStyles = () => {
  document.getElementsByTagName('body')[0]?.removeAttribute('class')

  document
    ?.querySelector(`link[href^="https://plugins.storyblok.com"]`)
    ?.remove()

  // Remove padding around body
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerText = 'body { margin: 0px; }'
  document.getElementsByTagName('head')[0]?.appendChild(style)
}

export const loadPlugin = (
  pluginName: string,
  initialValue: Record<string, unknown>,
  PluginComponent: Component<WrapperPluginProps>,
): void => {
  removeDefaultStoryblokStyles()
  const Vue = window.Storyblok.vue
  const pluginMixin = window.Storyblok.plugin
  const StoryblokPluginComponent = makeStoryblokPluginComponent(
    pluginName,
    initialValue,
    PluginComponent,
    Vue,
    pluginMixin,
  )
  if (process.env.NODE_ENV === 'development') {
    window.Fieldtype = StoryblokPluginComponent
    const customComp = window.Storyblok.vue.extend(StoryblokPluginComponent)
    window.Storyblok.vue.component('custom-plugin', customComp)
    window.StoryblokPluginRegistered = true
  } else {
    window.storyblok.field_types[pluginName] = StoryblokPluginComponent
  }
}
