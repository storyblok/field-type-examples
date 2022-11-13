<template>
  <div class="container">
    <HorizaontalSlider2
      v-if="!isArch"
      :value="value"
      :class="`slide-bar ${showLabel ? 'slide-bar--label' : ''}`"
      :min="minValue"
      :max="maxValue"
      :show-tooltip="showLabel"
      :paddingless="true"
      :process-style="{ backgroundColor: '#09b3af' }"
      @input="handleValueChange"
    />
  </div>
</template>

<script>
import HorizaontalSlider2 from './HorizontalSlider2'

export default {
  name: 'HorizontalSlider',
  components: {
    HorizaontalSlider2,
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
  align-items: center;
  gap: 10px;

  //&::after {
  //  content: '';
  //  position: absolute;
  //  border-radius: 50%;
  //  height: 20px;
  //  width: 20px;
  //  background: white;
  //  box-shadow: 0 0 4px rgb(0 0 0 / 32%);
  //  cursor: move;
  //  top: 50%;
  //  right: 0;
  //  transform: translate(10px, -50%);
  //}
}

.slide-bar--label {
  padding-top: 35px;
}
</style>