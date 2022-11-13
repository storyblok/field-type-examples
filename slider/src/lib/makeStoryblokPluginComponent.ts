import { ComponentOptions, VueConstructor } from 'vue'
import { PluginComponentProps } from '@/lib/types/PluginComponentProps'
import { RootPluginComponentComputed } from '@/lib/types/RootPluginComponentComputed'
import { RootComponentData } from '@/lib/types/RootComponentData'
import { RootPluginComponentMethods } from '@/lib/types/RootPluginComponentMethods'
import { WrapperPluginProps } from '@/lib/types/WrapperPluginProps'
import { Component } from 'vue'
import { RootPluginProps } from '@/lib/types/RootPluginProps'
import { ExtendedVue } from 'vue/types/vue'
import type Vue from 'vue'

export const makeStoryblokPluginComponent = (
  pluginName: string,
  initialValue: Record<string, unknown>,
  PluginComponent: Component<WrapperPluginProps>,
  Vue: VueConstructor<Vue>,
  pluginMixin: ComponentOptions<Vue> | typeof Vue,
): ExtendedVue<
  Vue,
  RootComponentData,
  RootPluginComponentMethods,
  RootPluginComponentComputed,
  RootPluginProps
> => {
  return Vue.component<
    RootComponentData,
    RootPluginComponentMethods,
    RootPluginComponentComputed,
    RootPluginProps
  >('Plugin', {
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
        return pluginName
      },
      initWith() {
        return {
          plugin: this.getPluginName(),
          ...initialValue,
        }
      },
      setValue(value: Record<string, unknown>) {
        this.$emit('changed-model', {
          plugin: this.getPluginName(),
          ...value,
        })
      },
    },
    render(createElement) {
      const props: PluginComponentProps = {
        isModalOpen: this.isModalOpen,
        setModalOpen: (value: boolean) => this.setModalOpen(value),
        options: this.options,
        setValue: (value: Record<string, unknown>) => this.setValue(value),
        value: this.model,
        spaceId: this.spaceId ?? undefined,
        token: this.token ?? undefined,
        name: this.getPluginName(),
      }
      return createElement(PluginComponent, { props })
    },
  })
}
