<template>
  <div class="plugin-card-content">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-card-content {
  display: flex;
  justify-content: center;
  height: $card-image-height !important;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
</style>
