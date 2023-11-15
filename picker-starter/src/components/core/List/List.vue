<template>
  <ol class="plugin-list">
    <slot />
  </ol>
</template>

<script>
export default {
  name: 'List',
}
</script>

<style scoped>
.plugin-list {
  display: flex;
  flex-direction: column;
}

ol {
  padding-left: 0;
}
</style>
