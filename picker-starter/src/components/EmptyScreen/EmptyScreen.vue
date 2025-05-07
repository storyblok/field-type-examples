<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div class="plugin-empty-container">
      <SbIcon
        :name="icon"
        class="plugin-empty-layout__icon"
        size="large"
        color="warning"
        background-color="warning"
        :stroke-width="1"
      />
      <SbHeader
        :title="title"
        :subtitle-text="description"
      />
    </div>
  </transition>
</template>

<script setup>
import { SbIcon, SbHeader } from '@storyblok/design-system'

defineProps({
  title: {
    type: String,
    required: false,
    default: undefined,
  },
  description: {
    type: String,
    required: false,
    default: undefined,
  },
  icon: {
    type: String,
    required: false,
    default: 'package-search',
  },
})
</script>

<style lang="scss">
.plugin-empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: 100%;
  height: 70vh;
  max-width: 469px;
  margin: 0 auto;
  text-align: center;

  p {
    width: 100%;
  }
}
</style>
