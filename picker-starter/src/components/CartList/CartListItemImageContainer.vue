<template>
  <div class="plugin-cart-list-item-image-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CartListItemImageContainer',
}
</script>

<style scoped>
.plugin-cart-list-item-image-container {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  align-items: center;
  background-color: #eff1f3;
  height: 52px;
  width: 68px;
  border-radius: 8px;
}
</style>
