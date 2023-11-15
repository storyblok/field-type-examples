<template>
  <div class="plugin-error-boundary">
    <em v-if="error">This field could not be displayed.</em>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  components: {},
  data() {
    return {
      error: undefined,
    }
  },
  errorCaptured(error, component) {
    this.error = error
    console.error(
      'An unhandled Error was thrown from component',
      component,
      ':',
      error,
    )
  },
}
</script>

<style scoped>
.plugin-error-boundary {
  color: #8d919f;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
}
</style>
