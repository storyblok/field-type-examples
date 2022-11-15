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
import ValueIndicator from '@/components/horizontal/ValueIndicator'
export default {
  name: 'Track',
  components: { ValueIndicator },
  props: {
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
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
      return `${
        (100 * (this.value - this.minValue)) / (this.maxValue - this.minValue)
      }%`
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles';

.track {
}

.track_value-indicator {
  float: left;
  @include transition(margin-left);
}
</style>