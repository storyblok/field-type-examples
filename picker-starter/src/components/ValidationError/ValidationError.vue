<template>
  <div class="plugin-validation-error">
    <SbIcon name="square-error" />
    <div class="plugin-validation-error__message">
      <span class="plugin-validation-error__title">Invalid Options</span>
      <div class="plugin-validation-error__body">
        <p>
          The component cannot be rendered. The provided options are invalid,
          because of the following reason:
        </p>
        <p class="plugin-validation-error__details">
          {{ validationResult.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SbIcon } from '@storyblok/design-system'

defineProps({
  validationResult: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.plugin-validation-error {
  height: auto;
  width: auto;
  overflow: auto;

  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
  background-color: #ffd7d5;
}

.plugin-validation-error__details {
  font-family: monospace;
}
.plugin-validation-error__example {
  white-space: pre;
  font-family: monospace;
}

.plugin-validation-error__message {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.plugin-validation-error__title {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  width: 75%;
  color: var(--sb-color-secondary-950);
  font-size: 1.6rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin: -2px 0px 0.35em;
}
.plugin-validation-error__body {
  display: block;
  overflow: hidden;
  color: var(--sb-color-secondary-950);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
  text-overflow: ellipsis;
}
</style>
