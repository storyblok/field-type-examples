<template>
  <div
    :class="`plugin-skeleton ${
      variant === 'rectangle'
        ? 'plugin-skeleton--rectangle'
        : variant === 'text'
          ? 'plugin-skeleton--text'
          : ''
    }`"
  />
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    variant: {
      validator(value) {
        return value === 'text' || value === 'rectangle'
      },
      default: 'text',
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-skeleton {
  display: block;
  background-color: rgba(0, 0, 0, 0.11);
  animation: 1.5s ease-in-out 0.5s infinite normal none running
    skeleton-animation;
  border-radius: 5px;
}

.plugin-skeleton--text {
  height: 1.2em;
}

.plugin-skeleton--rectangle {
  width: 100%;
  height: 100%;
}

@keyframes skeleton-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
