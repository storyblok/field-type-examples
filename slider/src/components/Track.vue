<template>
  <div class="track">
    <ValueIndicator
      class="track_value-indicator"
      :style="`margin-left: ${position};`"
    >
      {{ value }}
    </ValueIndicator>
  </div>
</template>

<script>
import ValueIndicator from '@/components/ValueIndicator'
export default {
  name: 'Track',
  components: { ValueIndicator },
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    position() {
      return `${(100 * (this.value - this.min)) / (this.max - this.min)}%`
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

.track {
}

.track_value-indicator {
  float: left;
  @include transition(margin-left);
}
</style>