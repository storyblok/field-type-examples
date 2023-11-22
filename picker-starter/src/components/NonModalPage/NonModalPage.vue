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

<script>
import { SbButton } from '@storyblok/design-system'
import { CartList } from '../CartList'
import { AddAssetButton } from '../AddAssetButton'
import { addItemsLabel } from './add-items-label'

export default {
  name: 'NonModal',
  components: {
    CartList,
    SbButton,
    AddAssetButton,
  },
  props: {
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
  },
  computed: {
    pickItemsLabel() {
      return addItemsLabel(this.maxItems)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

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

    &:not(:hover) {
      color: #1b243f;
      background-color: #f7f8f9;
    }
  }

  &__list {
    max-height: calc(3.5 * #{$card-height});
    overflow-y: auto;
  }
}
</style>
