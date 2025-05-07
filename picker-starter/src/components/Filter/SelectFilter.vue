<template>
  <SbSelect
    :multiple="filterItem.type === 'multi'"
    :label="filterItem.label"
    :options="filterItem.options"
    :model-value="modelValue"
    class="plugin-user-select"
    filterable
    clearable
    @update:model-value="input"
  />
</template>

<script lang="ts" setup>
import { SbSelect } from '@storyblok/design-system'

defineProps({
  filterItem: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Array],
    required: false,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const input = (value?: string | string[]) => {
  emit('update:modelValue', value ?? undefined)
}
</script>

<style scoped lang="scss">
.plugin-user-select.sb-select {
  width: auto;
}
</style>
