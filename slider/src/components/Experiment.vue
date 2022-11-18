<template>
  <div class="slider">
    {{ value }}
    <div
      ref="track"
      class="slider__track"
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

.slider {
  border: 10px solid black;
  padding: 20px 20px;
  background: blue;
  color: white;
}

.slider__track {
  padding: 0;
  border: none;
  background: red;
  color: #fff;
}
.slider__thumb {
  transform: translateX(-50%);
  @include transition(margin-left);
  //background: greenyellow;
  //border-radius: 0;
}
</style>