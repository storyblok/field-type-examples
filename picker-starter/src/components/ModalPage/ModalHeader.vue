<template>
  <div class="plugin-header">
    <div class="plugin-modal-layout__title font-size-lg">
      <div
        v-if="$slots.icon"
        class="plugin-header__icon"
      >
        <slot name="icon" />
      </div>
      <h1
        v-if="title"
        class="plugin-modal-layout__title-text"
      >
        {{ title }}
      </h1>
    </div>
    <div style="flex: 1" />
    <slot name="actions" />
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
@import '@/components/styles.scss';

.plugin-modal-layout__title {
  display: inline-flex;
  gap: 10px;
  align-items: center;

  @media only screen and (max-width: 300px) {
    display: none;
  }
}

.plugin-modal-layout__title-text {
  @media only screen and (max-width: 480px) {
    display: none;
  }
}

.plugin-modal-layout__done-button {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}

.plugin-header {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.plugin-header__icon {
  width: fit-content;
}
</style>
