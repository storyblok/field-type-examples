<template>
  <CartListItemImageContainer>
    <ItemImage
      :image-src="item.image"
      :label="item.name"
    />
  </CartListItemImageContainer>
</template>

<script>
import { ItemImage } from '../ItemImage'
import { CartListItemImageContainer } from '../CartListItemImageContainer'

export default {
  name: 'CartListItemImage',
  components: {
    CartListItemImageContainer,
    ItemImage,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
