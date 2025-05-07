<template>
  <SbButton
    :variant="size <= 0 ? 'tertiary' : 'secondary'"
    :disabled="disabled"
    size="small"
    class="plugin-button"
    @click.prevent="$emit('click')"
  >
    {{ label }}
  </SbButton>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SbButton } from '@storyblok/design-system'
import { addedItemsCountLabel } from './added-items-count-label'

const props = defineProps({
  size: {
    type: Number,
    required: false,
    default: 0,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  maxItems: {
    type: Number,
    require: false,
    default: undefined,
  },
})

defineEmits(['click'])

const label = computed(() => {
  return addedItemsCountLabel(props.size, props.maxItems)
})
</script>

<style scoped lang="scss">
.plugin-button {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
