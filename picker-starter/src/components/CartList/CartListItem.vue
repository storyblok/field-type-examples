<template>
  <ListItem class="plugin-cart-list-item">
    <SbIcon
      class="plugin-cart-list-item__handle"
      name="handle"
      size="normal"
      color="dark-blue"
    />
    <CartListItemImage :item="item" />
    <div class="plugin-cart-list-item__text">
      <p class="plugin-cart-list-item__name">
        {{ item.name }}
      </p>
      <p
        v-if="item.description"
        class="plugin-cart-list-item__description"
      >
        {{ item.description }}
      </p>
    </div>
    <SbButton
      class="plugin-cart-list-item__remove"
      size="small"
      icon="trash-2"
      variant="tertiary"
      has-icon-only
      @click="basket.remove(item)"
    />
  </ListItem>
</template>

<script setup>
import { SbButton, SbIcon } from '@storyblok/design-system'
import { ListItem, CartListItemImage } from '@/components'

defineProps({
  item: {
    type: Object,
    required: true,
  },
  // Replace this prop with onRemove
  basket: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-cart-list-item {
  justify-self: flex-end;
  position: relative;
  @include transition(background-color);
  background-color: var(--sb-color-neutral-white);
  padding: 6px 8px;
  border-radius: 5px;

  &:hover {
    background-color: #f7f8f9;

    .plugin-cart-list-item__remove {
      opacity: 1;
    }
  }
}

.plugin-cart-list-item__handle {
  min-width: 2.4rem;
}

.plugin-cart-list-item__text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;

  > p {
    margin: 0;
  }
}

.plugin-cart-list-item__name {
  @include typography-title;
  font-size: 12px;
  font-weight: 400;
}

.plugin-cart-list-item__description {
  @include typography-description;
  font-size: 10px;
  @include max-lines(3);
}

.plugin-cart-list-item__remove {
  position: absolute;
  right: 10px;
  top: 10px;

  @media (hover: hover) and (pointer: fine) {
    color: var(--sb-color-secondary-950);
    background-color: var(--sb-color-neutral-white);
    opacity: 0;

    &:hover {
      color: inherit;
      background-color: #eff1f3;
    }
  }
}
</style>
