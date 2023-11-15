<template>
  <div>
    <img
      v-if="imageSrc"
      :alt="`${label}`"
      :src="imageSrc"
      class="plugin-item-image"
    />
    <Avatar
      v-else
      :image-src="imageSrc"
      :label="label"
    />
  </div>
</template>

<script>
import { Avatar } from '../Avatar'

export default {
  name: 'ItemImage',
  components: {
    Avatar,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    imageSrc: {
      type: String,
      required: false,
      default: undefined,
    },
  },
}
</script>

<style scoped>
.plugin-item-image {
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  height: 100%;
  max-width: 100%;
}
</style>
