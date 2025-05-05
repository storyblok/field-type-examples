<script lang="ts" setup>
import { SbIcon } from '@storyblok/design-system'

defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="error-notification">
    <SbIcon name="square-error" />
    <div class="error-notification__message">
      <span
        v-if="title"
        class="error-notification__title"
      >
        {{ title }}
      </span>
      <div class="error-notification__body">
        <p v-if="message">
          {{ message }}
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.error-notification {
  height: auto;
  width: auto;
  overflow: hidden;

  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
  background: var(--sb-color-red-100);
}

.error-notification__message {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 100%;
}

.error-notification__title {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  width: 75%;
  color: var(--sb-color-secondary-950);
  font-size: 1.6rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.35em;
}
.error-notification__body {
  display: block;
  overflow: hidden;
  color: var(--sb-color-secondary-950);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
  text-overflow: ellipsis;
}
</style>
