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

<script>
import { SbButton } from '@storyblok/design-system'
import { addedItemsCountLabel } from './added-items-count-label'

export default {
  name: 'ViewCartButton',
  components: {
    SbButton,
  },
  props: {
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
  },
  computed: {
    label() {
      return addedItemsCountLabel(this.size, this.maxItems)
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-button {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
