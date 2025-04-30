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
        {{ renderedInitials }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { pseudoRandomColor } from '@/utils'
import { initials } from '@/utils'

const props = defineProps({
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

const renderedInitials = computed(() => initials(props.label))
const backgroundColor = computed(() => pseudoRandomColor(props.label))
</script>

<style scoped lang="scss">
@import '@/components/styles';

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
  overflow-x: hidden;

  width: $avatar-height;
  height: $avatar-height;

  border-radius: 5px;
}

.plugin-item-image__fallback-text {
  color: var(--sb-color-neutral-white);
  font-size: 14px;
  font-weight: 500;
}
</style>
