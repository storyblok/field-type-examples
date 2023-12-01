<template>
  <div
    class="plugin-card"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: Boolean,
  },
  emits: ['click'],
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  position: relative;
  padding: 10px;

  background-color: #ffffff;
}
</style>
