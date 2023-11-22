<template>
  <div class="plugin-header">
    <div class="plugin-modal-layout__title font-size-lg">
      <div
        v-if="$slots.icon"
        class="plugin-header__icon"
      >
        <slot name="icon" />
      </div>
      <h1
        v-if="title"
        class="plugin-modal-layout__title-text"
      >
        {{ title }}
      </h1>
    </div>
    <div style="flex: 1" />
    <slot name="actions" />
    <SbButton
      class="plugin-modal-layout__close-button"
      size="small"
      variant="tertiary"
      icon="x"
      has-icon-only
      @click.prevent="closeModal"
    />
  </div>
</template>

<script>
import { SbButton } from '@storyblok/design-system'

export default {
  name: 'ModalLayout',
  components: {
    SbButton,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    closeModal: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

.plugin-modal-layout__title {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  @media only screen and (max-width: 300px) {
    display: none;
  }
}

.plugin-modal-layout__title-text {
  @media only screen and (max-width: 480px) {
    display: none;
  }
}

.plugin-modal-layout__done-button {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}

.plugin-header {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.plugin-header__icon {
  width: fit-content;
}
</style>
