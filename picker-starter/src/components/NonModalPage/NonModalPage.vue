<template>
  <div class="plugin-non-modal-page">
    <div
      v-if="!basket.isEmpty()"
      class="plugin-non-modal-page__cart"
    >
      <CartList
        :basket="basket"
        class="plugin-non-modal-page__list"
      />
      <SbButton
        :label="pickItemsLabel"
        class="plugin-non-modal-page__add-button"
        variant="primary"
        icon="plus"
        size="small"
        @click.prevent="openModal"
      />
    </div>

    <AddAssetButton
      v-else
      :label="pickItemsLabel"
      @click.prevent="openModal"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { SbButton } from '@storyblok/design-system'
import { AddAssetButton, CartList } from '@/components'
import { addItemsLabel } from './add-items-label'

const props = defineProps({
  openModal: {
    type: Function,
    required: false,
    default: () => undefined,
  },
  basket: {
    type: Object,
    required: true,
  },
  maxItems: {
    type: Number,
    default: undefined,
  },
})

const pickItemsLabel = computed(() => addItemsLabel(props.maxItems))
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-non-modal-page {
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  overflow: auto;

  &__cart {
    display: flex;
    flex-direction: column;
    border: 1px solid #dfe3e8;
    border-radius: 5px;
    overflow: hidden;
  }

  &__add-button {
    border-radius: 0 0 5px 5px;
    @include transition(background-color, color);
  }

  &__list {
    background-color: var(--sb-color-neutral-white);
    padding: 10px;
    max-height: calc(3.5 * #{$card-height});
    overflow-y: auto;
  }
}
</style>
