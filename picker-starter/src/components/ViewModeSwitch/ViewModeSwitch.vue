<template>
  <SbGroupButton
    variant="tertiary"
    size="small"
    class="plugin-view-mode-switch"
  >
    <SbButton
      class="plugin-view-mode-switch__button"
      :disabled="modelValue === 'grid'"
      icon="layout-grid"
      has-icon-only
      @click="handleSelectGrid"
    />
    <SbButton
      class="plugin-view-mode-switch__button"
      :disabled="modelValue === 'list'"
      icon="layout-list"
      has-icon-only
      @click="handleSelectList"
    />
  </SbGroupButton>
</template>

<script lang="ts" setup>
import { SbButton, SbGroupButton } from '@storyblok/design-system'

defineProps({
  modelValue: {
    type: String,
    required: true,
    validator(value: string) {
      return ['grid', 'list'].includes(value)
    },
  },
})

const emit = defineEmits(['update:modelValue'])

const handleSelectGrid = () => {
  emit('update:modelValue', 'grid')
}
const handleSelectList = () => {
  emit('update:modelValue', 'list')
}
</script>

<style scoped lang="scss">
.plugin-view-mode-switch {
  flex-direction: row;
  gap: 5px;

  .plugin-view-mode-switch__button {
    padding: 8px;

    &:disabled:not(.sb-button--loading) {
      background-color: var(--sb-color-base-50);
      color: var(--sb-color-secondary-950);
    }
  }
}

@media (min-width: 768px) {
  .plugin-view-mode-switch {
    gap: 0;
  }
}
</style>
