import { Component } from 'vue'

type Data = {
  isModalOpen: boolean
}

export type Plugin = {
  name: string
  initialValue: Record<string, unknown>
  Component: Component
}

export const makeStoryblokPluginComponent = (plugin: Plugin) => {
  const Vue = window.Storyblok.vue
  const pluginMixin = window.Storyblok.plugin

  return Vue.component<Data, any, any, any>('TestComponent', {
    mixins: [pluginMixin],
    data() {
      return {
        isModalOpen: false,
      }
    },
    methods: {
      setModalOpen(value: boolean) {
        this.isModalOpen = value
        this.$emit('toggle-modal', value)
      },
      getPluginName() {
        return plugin.name
      },
      initWith() {
        return {
          plugin: this.getPluginName(),
          ...plugin.initialValue,
        }
      },
      setValue(value: Record<string, string>) {
        this.$emit('changed-model', {
          plugin: this.getPluginName(),
          ...value,
        })
      },
    },
    render(createElement) {
      return createElement(plugin.Component, {
        props: {
          isModalOpen: this.isModalOpen,
          setModalOpen: (value: boolean) => this.setModalOpen(value),
          options: this.options,
          setValue: (value: Record<string, string>) => this.setValue(value),
          value: this.model,
        },
      })
    },
  })
}
