<template>
  <li
    class="plugin-list-item"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])
const handleClick = () => emit('click')
</script>

<style scoped>
.plugin-list-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

li {
  list-style: none;
}
</style>
