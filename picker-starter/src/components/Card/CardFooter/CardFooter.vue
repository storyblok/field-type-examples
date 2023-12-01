<template>
  <div class="plugin-card-footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardFooter',
}
</script>

<style scoped>
.plugin-card-footer {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
