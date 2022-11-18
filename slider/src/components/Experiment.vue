<template>
  <div class="slider__container">
    {{ value }}
    <div
      ref="track"
      class="slider"
      @mousedown.prevent="handleClickTrack"
      @resize="log"
    >
      <Thumb
        ref="thumb"
        class="slider__thumb"
        :style="`
          margin-left: ${thumbPosition};
          transition-duration: ${isMoving ? '0ms' : '100ms'};
        `"
        :on-click="handleClickThumb"
      />
      <div class="slider__rail">
        <div
          :style="`
          width: ${thumbPosition};
          transition-duration: ${isMoving ? '0ms' : '100ms'};
          `"
          class="slider__track"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Thumb from '@/components/Thumb'
import { roundToNearest } from '@/utils/roundToNearest'

const valueFromCoordinate = (x, width, minValue, maxValue) => {
  return (x * (maxValue - minValue)) / width + minValue
}
const coordinateFromValue = (value, width, minValue, maxValue) => {
  return ((value - minValue) * width) / (maxValue - minValue)
}
// const numericValueFromString = (stringValue) => Number(stringValue)
// const stringValueFromNumeric = (numericValue, precision) =>
//   numericValue.toPrecision(precision)

export default {
  name: 'Experiment',
  components: { Thumb },
  props: {
    id: {
      type: String,
      default: 'wrap',
    },
    // Keep
    setValue: {
      type: Function,
      default: () => {},
    },
    value: {
      type: Number,
      default: 0,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    stepSize: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isMoving: false,
      xOffset: 0,
      refs: {},
    }
  },
  computed: {
    thumbPosition() {
      return `${coordinateFromValue(
        this.value,
        this.getTrackWidth(),
        this.minValue,
        this.maxValue,
      )}px`
    },
  },
  created() {
    // End touch/click
    document.addEventListener('mouseup', this.handleReleaseThumb)
    document.addEventListener('mouseleave', this.handleReleaseThumb)
    document.addEventListener('touchend', this.handleReleaseThumb)
    // Move
    document.addEventListener('mousemove', this.handleMove)
    document.addEventListener('touchmove', this.handleMove)
  },
  destroyed() {
    // End touch/click
    document.removeEventListener('mouseup', this.handleReleaseThumb)
    document.removeEventListener('mouseleave', this.handleReleaseThumb)
    document.removeEventListener('touchend', this.handleReleaseThumb)
    // Move
    document.removeEventListener('mousemove', this.handleMove)
    document.removeEventListener('touchmove', this.handleMove)
  },
  methods: {
    getTrackWidth() {
      return this.$refs.track?.getBoundingClientRect()?.width ?? 300
    },
    log() {
      // console.log(e)
    },
    handleClickThumb(e) {
      console.log(this.$refs.thumb.$el)
      const thumbRect = this.$refs.thumb.$el.getBoundingClientRect()
      this.offsetX = e.pageX - thumbRect.x - thumbRect.width / 2
      this.isMoving = true
    },
    handleReleaseThumb() {
      this.isMoving = false
    },
    handleMove(e) {
      if (!this.isMoving) {
        return
      }
      const x =
        e.pageX - this.$refs.track.getBoundingClientRect().x - this.offsetX
      this.setCoordinate(x)
    },
    handleClickTrack(e) {
      this.setCoordinate(e.offsetX)
    },
    setCoordinate(x) {
      const unboundValue = valueFromCoordinate(
        x,
        this.getTrackWidth(),
        this.minValue,
        this.maxValue,
      )
      // Min-max
      const boundValue = Math.min(
        this.maxValue,
        Math.max(unboundValue, this.minValue),
      )
      const value = roundToNearest(boundValue, this.stepSize)
      this.setValue(value)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';
//$arrowHeight: 5px;
$rail-height: 6px;
//$padding-label: 5px 10px;
//$margin-top: 3px;
$z-index-rail: 0;
$z-index-thumb: 1;

.slider__container {
  padding: 20px 20px;
}
.slider {
  padding: 0;
  border: none;
  color: #fff;
  position: relative;
}

.slider__thumb {
  transform: translateX(-50%);
  @include transition(margin-left);
  z-index: $z-index-thumb;
}

.slider__rail {
  height: $rail-height;
  background-color: $color-grey;
  border-radius: $rail-height;
  position: absolute;
  top: 50%;
  left: 0px;
  width: 100%;
  transform: translateY(-50%);
  z-index: $z-index-rail;
}

.slider__track {
  background-color: $color-teal;
  height: 100%;
  border-radius: $rail-height;
  @include transition(width);
}
</style>