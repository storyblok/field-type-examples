<template>
  <ListItem class="plugin-cart-list-item">
    <SbIcon
      class="plugin-cart-list-item__handle"
      name="handle"
      size="normal"
      color="light-gray"
    />
    <CartListItemImage :item="item" />
    <div class="plugin-cart-list-item__text">
      <div class="plugin-cart-list-item__name">
        {{ item.name }}
      </div>
      <div
        v-if="item.description"
        class="plugin-cart-list-item__description"
      >
        {{ item.description }}
      </div>
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

<script>
import { SbButton, SbIcon } from '@storyblok/design-system'
import { ListItem } from '../../List'
import { CartListItemImage } from '../../CartListItemImage'

export default {
  name: 'CartListItem',
  components: {
    ListItem,
    SbButton,
    SbIcon,
    CartListItemImage,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    // Replace this prop with onRemove
    basket: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles.scss';

.plugin-cart-list-item__handle {
  min-width: 2.4rem;
}

.plugin-cart-list-item__text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.plugin-cart-list-item__name {
  @include typography-title;
}

.plugin-cart-list-item__description {
  @include typography-description;
  @include max-lines(3);
}

.plugin-cart-list-item {
  justify-self: flex-end;
  position: relative;
  @include transition(background-color);
  background-color: #ffffff;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    background-color: #f7f8f9;

    .plugin-cart-list-item__remove {
      opacity: 1;
    }
  }
}

.plugin-cart-list-item__remove {
  position: absolute;
  right: 10px;
  top: 10px;

  @media (hover: hover) and (pointer: fine) {
    color: #b1b5be;
    opacity: 0;
    &:hover {
      color: inherit;
      background-color: #eff1f3;
    }
  }
}
</style>
