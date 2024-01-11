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
  border: 1px solid #eff1f3;
  max-height: 80px;
  max-width: 106px;
  border-radius: 5px;
}
</style>
