<template>
  <ol class="plugin-grid">
    <slot />
  </ol>
</template>

<script>
export default {
  name: 'Grid',
}
</script>

<style scoped>
.plugin-grid {
  display: grid;
  justify-items: stretch;
  grid-gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
}

ol {
  padding-left: 0;
}
</style>
