<template>
  <div class="plugin-field-modal">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FieldModal',
}
</script>

<style scoped>
.plugin-field-modal {
  overflow: auto;
  box-sizing: border-box;
  width: 90%;
  height: 100%;
  max-height: 80vh;
  margin: auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
}
</style>