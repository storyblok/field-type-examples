<template>
  <li
    class="plugin-list-item"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  emits: ['click'],
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
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
