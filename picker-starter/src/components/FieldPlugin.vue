<script setup lang="ts">
import { computed } from 'vue'
import { Picker } from './Picker'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import { pluginName } from '../settings'
import setup from '../picker.config'

const plugin = useFieldPlugin()

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

const servicePluginParams = computed(() => {
  return setup(plugin.data.options)
})
</script>

<template>
  <Picker
    v-if="plugin.type === 'loaded'"
    v-bind="servicePluginParams"
    :unvalidated-options="plugin.data.options"
    :is-modal-open="plugin.data.isModalOpen"
    :set-modal-open="plugin.actions.setModalOpen"
    :value="content"
    :set-value="setValue"
    :name="pluginName"
  />
</template>
