<template>
  <div class="plugin-card-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContent',
}
</script>

<style scoped lang="scss">
@import '../../styles.scss';

.plugin-card-content {
  display: flex;
  justify-content: center;
  height: $card-image-height !important;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
</style>
