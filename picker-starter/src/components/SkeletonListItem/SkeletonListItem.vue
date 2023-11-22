<template>
  <div class="plugin-skeleton-list-item">
    <Skeleton
      variant="rectangle"
      class="plugin-skeleton-list-item__skeleton"
    />
  </div>
</template>

<script>
import { Skeleton } from '../Skeleton'

export default {
  name: 'SkeletonListItem',
  components: {
    Skeleton,
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

.plugin-skeleton-list-item {
  padding: 15px 10px;
  flex: 1;
}

.plugin-skeleton-list-item__skeleton {
  height: $avatar-height;
}
</style>
