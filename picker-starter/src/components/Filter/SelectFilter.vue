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

<script>
import { SbSelect } from '@storyblok/design-system'

export default {
  name: 'SelectFilter',
  components: {
    SbSelect,
  },
  props: {
    filterItem: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Array],
      required: false,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    input(value) {
      this.$emit('update:modelValue', value ?? undefined)
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-user-select.sb-select {
  width: auto;
}
</style>
