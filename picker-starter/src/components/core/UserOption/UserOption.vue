<template>
  <SbSelect
    :multiple="userOption.type === 'multi'"
    :label="userOption.label"
    :options="userOption.options"
    :model-value="modelValue"
    class="plugin-user-select"
    filterable
    clearable
    @update:modelValue="input"
  />
</template>

<script>
import { SbSelect } from '@storyblok/design-system'

export default {
  name: 'UserOption',
  components: {
    SbSelect,
  },
  props: {
    userOption: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Array],
      required: false,
      default: undefined,
    },
  },
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
