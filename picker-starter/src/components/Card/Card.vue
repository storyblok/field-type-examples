<template>
  <div
    class="plugin-card"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  value: Boolean,
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
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

  background-color: var(--sb-color-neutral-white);
}
</style>
