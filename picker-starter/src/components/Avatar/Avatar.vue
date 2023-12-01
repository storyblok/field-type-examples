<!--suppress ES6PreferShortImport -->
<template>
  <div>
    <img
      v-if="imageSrc"
      :src="imageSrc"
      alt="Avatar"
      class="plugin-avatar"
    />
    <div
      v-else
      :style="`background-color: ${backgroundColor}`"
      class="plugin-item-image__fallback-container"
    >
      <span
        class="plugin-item-image__fallback-text sb-typography font-size-lg font-weight-medium"
      >
        {{ initials }}
      </span>
    </div>
  </div>
</template>

<script>
import { pseudoRandomColor } from '@/utils'
import { initials } from '@/utils'

export default {
  name: 'Avatar',
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
  computed: {
    initials() {
      return initials(this.label)
    },
    backgroundColor() {
      return pseudoRandomColor(this.label)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';

.plugin-avatar {
  vertical-align: middle;
  width: $avatar-height;
  height: $avatar-height;
  border-radius: 5px;

  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
}

.plugin-item-image__fallback-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: $avatar-height;
  height: $avatar-height;
  color: white;

  border-radius: 5px;
}

.plugin-item-image__fallback-text {
}
</style>
