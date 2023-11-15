<template>
  <button
    class="plugin-add-item-big-button"
    @click.prevent="handleClick"
  >
    <CartListItemImageContainer>
      <SbIcon name="block-image" />
    </CartListItemImageContainer>
    <span class="plugin-add-item-big-button__label">
      <SbIcon
        name="plus"
        size="small"
      />
      {{ label }}
    </span>
  </button>
</template>

<script>
import { SbIcon } from '@storyblok/design-system'
import { CartListItemImageContainer } from '../CartListItemImageContainer'

export default {
  name: 'AddAssetButton',
  components: {
    CartListItemImageContainer,
    SbIcon,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

.plugin-add-item-big-button {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  cursor: pointer;
  border: 1px solid #dfe3e8;
  border-radius: 5px;

  background-color: #ffffff;

  @include transition(background-color);

  &:hover {
    background-color: #f7f8f9;
  }
}

.plugin-add-item-big-button__label {
  display: inline-flex;
  align-items: center;
  color: #1b243f;
  font-size: 1.4rem;
  font-weight: 500;
}
</style>
