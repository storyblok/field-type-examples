<template>
  <button
    class="plugin-add-item-big-button"
    @click.prevent="handleClick"
  >
    <CartListItemImageContainer class="plugin-add-item-big-button__container">
      <SbIcon name="shopping-cart" />
    </CartListItemImageContainer>
    <span class="plugin-add-item-big-button__label">
      <SbIcon
        name="plus"
        size="small"
        :stroke-width="3"
      />
      {{ label }}
    </span>
  </button>
</template>

<script setup>
import { SbIcon } from '@storyblok/design-system'
import { CartListItemImageContainer } from '@/components'

defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-add-item-big-button {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  cursor: pointer;
  border: 1px solid var(--sb-color-secondary-100);
  border-radius: 5px;
  background-color: var(--sb-color-neutral-white);

  @include transition(background-color);

  &:hover,
  &:focus {
    outline: none;
    border-color: var(--sb-color-primary-700);
  }

  .plugin-add-item-big-button__container {
    height: 80px;
    min-width: 106px;
  }

  .plugin-add-item-big-button__label {
    display: inline-flex;
    align-items: center;
    color: var(--sb-color-secondary-950);
    font-size: 1.4rem;
    font-weight: 500;
  }
}
</style>
