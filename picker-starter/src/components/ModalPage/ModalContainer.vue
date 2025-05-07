<template>
  <div class="plugin-modal-layout">
    <slot name="header" />
    <slot name="main" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: undefined,
  },
})
</script>

<style scoped lang="scss">
.plugin-modal-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
