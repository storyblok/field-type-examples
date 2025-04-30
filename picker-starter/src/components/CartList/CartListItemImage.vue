<template>
  <CartListItemImageContainer
    :style="`background-color: ${pseudoRandomColor(item.name)}`"
  >
    <ItemImage
      class="plugin-cart-list-item__image-wrapper"
      :image-src="item.image"
      :label="item.name"
    />
  </CartListItemImageContainer>
</template>

<script setup>
import { pseudoRandomColor } from '@/utils'
import { CartListItemImageContainer, ItemImage } from '@/components'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.plugin-cart-list-item__image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
