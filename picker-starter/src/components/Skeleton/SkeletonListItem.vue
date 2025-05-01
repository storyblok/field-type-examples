<template>
  <div class="plugin-skeleton-list-item">
    <Skeleton
      variant="rectangle"
      class="plugin-skeleton-list-item__skeleton"
    />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components'
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-skeleton-list-item {
  padding: 15px 10px;
  flex: 1;
}

.plugin-skeleton-list-item__skeleton {
  height: $avatar-height;
}
</style>
