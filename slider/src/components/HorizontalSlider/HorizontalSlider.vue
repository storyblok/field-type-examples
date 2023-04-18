<template>
  <div
    :class="`slider__container ${focused ? 'slider__container--focused' : ''}`"
    @mousedown.prevent="handleClickTrack"
  >
    <div class="tooltip__container">
      <Tooltip
        class="tooltip"
        :style="`
          margin-left: ${markPosition(value)};
          ${isMoving ? 'transition-duration: 0ms' : ''}
          `"
      >
        {{ formatValue(value) }}
      </Tooltip>
    </div>
    <div
      ref="track"
      class="slider"
    >
      <Thumb
        ref="thumb"
        class="slider__thumb"
        :style="`
          margin-left: ${markPosition(value)};
          ${isMoving ? 'transition-duration: 0ms' : ''}
        `"
        :on-click="handleClickThumb"
        :focused="focused"
      >
        <input
          class="track__input"
          data-index="0"
          aria-label="slider"
          :aria-valuenow="`${value}`"
          :aria-valuemin="`${minValue}`"
          :aria-valuemax="`${maxValue}`"
          :value="`${value}`"
          :min="`${minValue}`"
          :max="`${maxValue}`"
          aria-orientation="horizontal"
          type="range"
          :step="stepSize"
          @input="handleInput"
          @focusin="setFocused"
          @focusout="setUnfocused"
        />
      </Thumb>
      <div class="slider__rail">
        <div class="slider__mark-circle__container">
          <div
            v-for="mark in marks"
            :key="mark"
            class="slider__mark-circle"
            :style="`left: ${markPosition(mark)};`"
          />
        </div>
        <div
          :style="`
          width: ${markPosition(value)};
          ${isMoving ? 'transition-duration: 0ms' : ''}
          `"
          class="slider__track"
        />
      </div>
    </div>
    <div class="slider__mark-label__container">
      <div
        class="slider_mark-label"
        :style="`left: ${markPosition(minValue)};`"
      >
        {{ formatValue(minValue) }}
      </div>
      <div
        v-for="markValue in marks"
        :key="markValue"
        class="slider_mark-label"
        :style="`left: ${markPosition(markValue)};`"
      >
        {{ formatValue(markValue) }}
      </div>
      <div
        class="slider_mark-label"
        :style="`left: ${markPosition(maxValue)};`"
      >
        {{ formatValue(maxValue) }}
      </div>
    </div>
  </div>
</template>

<script>
import { Thumb } from '@/components/Thumb'
import { roundToNearest } from '@/utils/roundToNearest'
import { Tooltip } from '@/components/Tooltip'
import { valueFromCoordinate } from '@/components/HorizontalSlider/valueFromCoordinate'
import { xCoordinateFromValue } from '@/components/HorizontalSlider/xCoordinateFromValue'

export default {
  name: 'Experiment',
  components: { Tooltip, Thumb },
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
      default: 0,
    },
    marks: {
      type: Array,
      default() {
        return []
      },
    },
    formatter: {
      type: Intl.NumberFormat,
      default() {
        return new Intl.NumberFormat(undefined, {})
      },
    },
  },
  data() {
    return {
      isMoving: false,
      xOffset: 0,
      refs: {},
      focused: false,
    }
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
    formatValue(value) {
      return this.formatter.format(value)
    },
    handleInput(e) {
      this.setValue(Number(e.target.value))
    },
    getTrackWidth() {
      return this.$refs.track?.getBoundingClientRect()?.width ?? 300
    },
    handleClickThumb(e) {
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
      this.setXCoordinate(x)
    },
    handleClickTrack(e) {
      this.setXCoordinate(e.offsetX)
    },
    setXCoordinate(x) {
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
      const value = this.stepSize
        ? roundToNearest(boundValue, this.stepSize)
        : boundValue
      this.setValue(value)
    },
    markPosition(mark) {
      const relativeX =
        xCoordinateFromValue(
          mark,
          this.getTrackWidth(),
          this.minValue,
          this.maxValue,
        ) / this.getTrackWidth()
      return `${100 * relativeX}%`
    },
    setFocused() {
      this.focused = true
    },
    setUnfocused() {
      this.focused = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles';
$gap: 3px;
$z-index-rail: 0;
$z-index-thumb: 1;

$rail-height: 6px;
$mark-height: 4px;

.slider__container {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: $gap;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:hover .tooltip,
  &.slider__container--focused .tooltip {
    opacity: 1;
  }
}

// Tooltip

.tooltip__container {
  display: flex;
  width: 100%;
}

.tooltip {
  padding: 0;
  opacity: 0;
  border: none;
  transform: translateX(-50%);
  @include transition(opacity, margin-left);
}

//Slider

.slider {
  padding: 0;
  border: none;
  position: relative;
}

.slider__thumb {
  transform: translateX(-50%);
  @include transition(margin-left);
  z-index: $z-index-thumb;
  cursor: pointer;
}

.track__input {
  border: 0;
  clip: rect(0 0 0 0);
  height: 100%;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 100%;
  direction: ltr;
}

// Rail

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
  cursor: pointer;
}

.slider__track {
  background-color: $color-teal;
  height: 100%;
  border-radius: $rail-height;
  @include transition(width);
}

// Mark circle

.slider__mark-circle__container {
}

.slider__mark-circle {
  position: absolute;
  height: $mark-height;
  width: $mark-height;
  border-radius: 50%;
  background-color: $color-white;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; // Click through
}

// Mark label

.slider__mark-label__container {
  position: relative;
  height: 1em;
  padding: 0px 0px;
}

.slider_mark-label {
  position: absolute;
  border-radius: 50%;
  transform: translateX(-50%);
  @include typography-label;
  color: $color-text-secondary;
}
</style>