<template>
  <li
    @click="handleClick"
    class="plugin-list-item"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'ListItem',
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
