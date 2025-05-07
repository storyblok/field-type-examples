<template>
  <ol class="plugin-list">
    <slot />
  </ol>
</template>

<style scoped>
.plugin-list {
  display: flex;
  flex-direction: column;
}

ol {
  padding-left: 0;
}
</style>
