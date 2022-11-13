<template>
  <RoundSlider
    :value="value"
    class="arch-slide-bar"
    radius="100"
    :min="minValue"
    :max="maxValue"
    :start-angle="-archAngle / 2 + 90"
    :end-angle="archAngle / 2 + 90"
    line-cap="round"
    range-color="#09b3af"
    path-color="#EFF1F3"
    width="20"
    :show-tooltip="showLabel"
    :style="{
      maxHeight: `${Math.max(
        showLabel ? 120 : 0,
        120 - 100 * Math.sin(((-archAngle / 2 + 90) * 3.14159) / 180),
      )}px`,
    }"
    @input="setValue"
  />
</template>

<script>
import RoundSlider from 'vue-round-slider'

export default {
  name: 'ArchSlider',
  components: {
    RoundSlider,
  },
  props: {
    setValue: {
      type: Function,
      default: () => {},
    },
    value: {
      type: Number,
      required: true,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    archAngle: {
      type: Number,
      default: 180,
    },
  },
}
</script>

<style scoped>

</style>