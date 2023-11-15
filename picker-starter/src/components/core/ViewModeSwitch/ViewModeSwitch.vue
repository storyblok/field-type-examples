<template>
  <SbGroupButton
    variant="tertiary"
    size="small"
    class="plugin-query-container"
  >
    <SbButton
      :disabled="modelValue === 'grid'"
      icon="grid"
      has-icon-only
      @click="handleSelectGrid"
    />
    <SbButton
      :disabled="modelValue === 'list'"
      icon="list"
      has-icon-only
      @click="handleSelectList"
    />
  </SbGroupButton>
</template>

<script>
import { SbButton, SbGroupButton } from '@storyblok/design-system'

export default {
  name: 'ViewModeSwitch',
  components: { SbButton, SbGroupButton },
  props: {
    modelValue: {
      type: String,
      required: true,
      validator(value) {
        return ['grid', 'list'].includes(value)
      },
    },
  },
  methods: {
    handleSelectGrid() {
      this.$emit('update:modelValue', 'grid')
    },
    handleSelectList() {
      this.$emit('update:modelValue', 'list')
    },
  },
}
</script>

<style scoped lang="scss"></style>
