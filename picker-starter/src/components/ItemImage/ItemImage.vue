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

<script setup>
import { Avatar } from '@/components'

defineProps({
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
})
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
