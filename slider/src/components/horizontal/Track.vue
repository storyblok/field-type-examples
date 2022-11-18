<template>
  <div class="slider__track">
    <div
      class="track__value-indicator"
      :style="`margin-left: ${position};`"
    >
      <div class="track__value-indicator__translate-x">
        <slot />
      </div>
    </div>
    <slot
      name="background"
      class="track__background"
    />
  </div>
</template>

<script>
export default {
  name: 'Track',
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

.track__background {
}

.slider__track {
  position: relative;
}

.track__value-indicator__translate-x {
  transform: translate(-50%, 0);
}

.track__value-indicator {
  float: left;
  @include transition(margin-left);
}
</style>