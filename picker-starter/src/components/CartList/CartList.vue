<template>
  <Draggable
    is="transition-group"
    class="plugin-cart-list"
    :list="basket.items"
    tag="ol"
    :animation="150"
    mode="out-in"
    name="flip-list"
    @change="handleDrop"
  >
    <CartListItem
      v-for="item in basket.items"
      :key="item.id"
      :item="item"
      :basket="basket"
      class="plugin-cart-list__item"
    />
  </Draggable>
</template>

<script setup>
import { CartListItem } from '@/components'
import { VueDraggableNext as Draggable } from 'vue-draggable-next'
import { move } from './move'

const props = defineProps({
  basket: {
    type: Object,
    required: true,
  },
})

const handleDrop = (dropEvent) => {
  props.basket.set(
    move(props.basket.items, dropEvent.oldIndex, dropEvent.newIndex),
  )
}
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-cart-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  // This is needed in order to prevent the iframe from cropping the bottom
  //  list item during the transition where an item is removed from basket.
  //margin-bottom: $card-height;
}

.plugin-cart-list__item {
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
}

.flip-list-leave-active,
.flip-list-enter-active {
  transition: $move-fade-transition;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.flip-list-leave-active {
  position: absolute;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
