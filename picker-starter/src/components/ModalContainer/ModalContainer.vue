<template>
  <div class="plugin-modal-layout">
    <slot name="header" />
    <slot name="main" />
  </div>
</template>

<script>
export default {
  name: 'ModalContainer',
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    closeModal: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-modal-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
