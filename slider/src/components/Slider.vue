<template>
  <div class="container">
    <ArchSlider
      v-if="isArch"
      :value="value"
      :set-value="setValue"
      :min-value="minValue"
      :max-value="maxValue"
      :show-label="showLabel"
      :arch-angle="archAngle"
      @input="handleValueChange"
    />
    <HorizontalSlider
      v-if="!isArch"
      :value="value"
      :set-value="setValue"
      :min-value="minValue"
      :max-value="maxValue"
      :show-label="showLabel"
      :arch-angle="archAngle"
      @input="handleValueChange"
    />
  </div>
</template>

<script>
import ArchSlider from '@/components/ArchSlider'
import HorizontalSlider from '@/components/HorizontalSlider'

export default {
  name: 'Slider',
  components: {
    ArchSlider,
    HorizontalSlider,
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
    isArch: {
      type: Boolean,
      default: false,
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
  methods: {
    handleValueChange(newValue) {
      this.setValue(newValue)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 100px 10px;
}

/* Arch slider  */

.arch-slide-bar {
  overflow: hidden;
  padding: 5px;
}

::v-deep .rs-tooltip-text {
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
