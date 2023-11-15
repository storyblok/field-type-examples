<script setup lang="ts">
import { computed } from 'vue'
import { EcommercePlugin } from './core'
import { mockPluginParams } from '../mock'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'

const plugin = useFieldPlugin()

const pluginName = 'sb-picker-starter'

const content = computed(() => {
  const content = plugin.data.content
  return typeof content === 'object' ? content : { name: pluginName }
})

const setValue = (content: any) => {
  plugin.actions.setContent({
    plugin: pluginName,
    ...content,
  })
}
</script>

<template>
  <EcommercePlugin
    v-if="plugin.type === 'loaded'"
    v-bind="mockPluginParams"
    :unvalidated-options="plugin.data.options"
    :is-modal-open="plugin.data.isModalOpen"
    :set-modal-open="plugin.actions.setModalOpen"
    :value="content"
    :set-value="setValue"
    :name="pluginName"
  />
</template>
