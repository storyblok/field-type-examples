<template>
  <div
    :id="id"
    ref="wrap"
    class="slider"
    :style="calculateHeight"
    @click="wrapClick"
  >
    <Track
      class="slider__label-track"
      :value="val"
      :min="min"
      :max="max"
    />
    <div
      ref="elem"
      class="slider-bar"
    >
      <div
        ref="tooltip"
        class="slider__cursor__container"
        @mousedown="moveStart"
        @touchstart="moveStart"
      >
        <div
          class="slider__cursor"
          :style="`left: ${position}px`"
        >
          <Thumb class="slider__knob" />
        </div>
      </div>
      <div
        ref="process"
        :style="`width: ${position}px`"
        class="slider__track"
      />
      <div class="slider__rail" />
    </div>
    <div class="slider__label-container">
      <div class="slider__range-label slider__range-label__min">
        {{ min }}
      </div>
      <div class="slider__range-label slider__range-label__max">
        {{ max }}
      </div>
    </div>
  </div>
</template>
<script>
import Track from '@/components/Track'
import Thumb from '@/components/Thumb'
export default {
  name: 'HorizaontalSlider2',
  components: { Thumb, Track },
  props: {
    data: {
      type: Array,
      default: null,
    },
    id: {
      type: String,
      default: 'wrap',
    },
    speed: {
      type: Number,
      default: 0.5,
    },
    lineHeight: {
      type: Number,
      default: 5,
    },
    iconWidth: {
      type: Number,
      default: 20,
    },
    value: {
      type: [String, Number],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: false,
      size: 0,
      currentValue: 0,
      currentSlider: 0,
      isComponentExists: true,
      interval: 1,
      lazy: false,
      realTime: false,
    }
  },
  computed: {
    slider() {
      return this.$refs.tooltip
    },
    val: {
      get() {
        return this.data ? this.data[this.currentValue] : this.currentValue
      },
      set(val) {
        if (this.data) {
          let index = this.data.indexOf(val)
          if (index > -1) {
            this.currentValue = index
          }
        } else {
          this.currentValue = val
        }
      },
    },
    currentIndex() {
      return (this.currentValue - this.minimum) / this.spacing
    },
    minimum() {
      return this.data ? 0 : this.min
    },
    maximum() {
      return this.data ? this.data.length - 1 : this.max
    },
    multiple() {
      let decimals = `${this.interval}`.split('.')[1]
      return decimals ? Math.pow(10, decimals.length) : 1
    },
    spacing() {
      return this.data ? 1 : this.interval
    },
    total() {
      if (this.data) {
        return this.data.length - 1
      } else if (
        Math.floor((this.maximum - this.minimum) * this.multiple) %
          (this.interval * this.multiple) !==
        0
      ) {
        this.printError(
          '[VueSlideBar error]: Prop[interval] is illegal, Please make sure that the interval can be divisible',
        )
      }
      return (this.maximum - this.minimum) / this.interval
    },
    gap() {
      return this.size / this.total
    },
    position() {
      return ((this.currentValue - this.minimum) / this.spacing) * this.gap
    },
    limit() {
      return [0, this.size]
    },
    valueLimit() {
      return [this.minimum, this.maximum]
    },
    calculateHeight() {
      return {}
    },
  },
  watch: {
    value(val) {
      if (this.flag) {
        this.setValue(val)
      } else {
        this.setValue(val, this.speed)
      }
    },
    max(val) {
      if (val < this.min) {
        return this.printError(
          '[VueSlideBar error]: The maximum value can not be less than the minimum value.',
        )
      }
      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    },
    min(val) {
      if (val > this.max) {
        return this.printError(
          '[VueSlideBar error]: The minimum value can not be greater than the maximum value.',
        )
      }
      let resetVal = this.limitValue(this.val)
      this.setValue(resetVal)
      this.refresh()
    },
  },
  mounted() {
    this.isComponentExists = true
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return this.printError(
        '[VueSlideBar error]: window or document is undefined, can not be initialization.',
      )
    }
    this.$nextTick(() => {
      if (this.isComponentExists) {
        this.getStaticData()
        this.setValue(this.limitValue(this.value), 0)
        this.bindEvents()
      }
    })
  },
  beforeDestroy() {
    this.isComponentExists = false
    this.unbindEvents()
  },
  methods: {
    bindEvents() {
      document.addEventListener('touchmove', this.moving, { passive: false })
      document.addEventListener('touchend', this.moveEnd, { passive: false })
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('mouseup', this.moveEnd)
      document.addEventListener('mouseleave', this.moveEnd)
      window.addEventListener('resize', this.refresh)
    },
    unbindEvents() {
      window.removeEventListener('resize', this.refresh)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('touchend', this.moveEnd)
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('mouseleave', this.moveEnd)
    },
    getPos(e) {
      this.realTime && this.getStaticData()
      return e.clientX - this.offset
    },
    wrapClick(e) {
      if (!this.draggable && e.target.id === this.id) {
        return false
      }
      let pos = this.getPos(e)
      this.setValueOnPos(pos)
    },
    moveStart() {
      if (!this.draggable) {
        return false
      }
      this.flag = true
      this.$emit('dragStart', this)
    },
    moving(e) {
      if (!this.flag || !this.draggable) {
        return false
      }
      e.preventDefault()
      if (e.targetTouches && e.targetTouches[0]) {
        e = e.targetTouches[0]
      }
      this.setValueOnPos(this.getPos(e), true)
    },
    moveEnd() {
      if (this.flag && this.draggable) {
        this.$emit('dragEnd', this)
        if (this.lazy && this.isDiff(this.val, this.value)) {
          this.syncValue()
        }
      } else {
        return false
      }
      this.flag = false
    },
    setValueOnPos(pos, isDrag) {
      let range = this.limit
      let valueRange = this.valueLimit
      if (pos >= range[0] && pos <= range[1]) {
        let v =
          (Math.round(pos / this.gap) * (this.spacing * this.multiple) +
            this.minimum * this.multiple) /
          this.multiple
        this.setCurrentValue(v, isDrag)
      } else if (pos < range[0]) {
        this.setCurrentValue(valueRange[0])
        if (this.currentSlider === 1) {
          this.currentSlider = 0
        }
      } else {
        this.setCurrentValue(valueRange[1])
        if (this.currentSlider === 0) {
          this.currentSlider = 1
        }
      }
    },
    isDiff(a, b) {
      if (
        Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)
      ) {
        return true
      } else if (Array.isArray(a) && a.length === b.length) {
        return a.some((v, i) => v !== b[i])
      }
      return a !== b
    },
    setCurrentValue(val) {
      if (val < this.minimum || val > this.maximum) {
        return false
      }
      if (this.isDiff(this.currentValue, val)) {
        this.currentValue = val
        if (!this.lazy || !this.flag) {
          this.syncValue()
        }
      }
    },
    setValue(val) {
      if (this.isDiff(this.val, val)) {
        let resetVal = this.limitValue(val)
        this.val = resetVal
        this.syncValue()
      }
    },
    limitValue(val) {
      if (this.data) {
        return val
      }
      const inRange = (v) => {
        if (v < this.min) {
          this.printError(
            `[VueSlideBar warn]: The value of the slider is ${val}, the minimum value is ${this.min}, the value of this slider can not be less than the minimum value`,
          )
          return this.min
        } else if (v > this.max) {
          this.printError(
            `[VueSlideBar warn]: The value of the slider is ${val}, the maximum value is ${this.max}, the value of this slider can not be greater than the maximum value`,
          )
          return this.max
        }
        return v
      }
      return inRange(val)
    },
    syncValue() {
      let val = this.val
      if (this.range) {
        this.$emit('callbackRange', this.range[this.currentIndex])
      }
      this.$emit('input', val)
    },
    getStaticData() {
      if (this.$refs.elem) {
        this.size = this.$refs.elem.offsetWidth
        this.offset = this.$refs.elem.getBoundingClientRect().left
      }
    },
    refresh() {
      if (this.$refs.elem) {
        this.getStaticData()
        this.setPosition()
      }
    },
    printError(msg) {
      console.error(msg)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';
$arrowHeight: 5px;
$rail-height: 6px;
$knob-radius: 13px;
$padding-label: 5px 10px;
$margin-top: 3px;

.slider {
  position: relative;
  box-sizing: border-box;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  padding: 0px 20px; //tmp

  & .slider__label-track {
    @include transition(opacity);
  }
  &:not(:hover) .slider__label-track {
    opacity: 0;
  }
  &:hover .slider__label-track {
    opacity: 1;
  }
}

.slider-bar {
  position: relative;
  display: block;
  border-radius: 15px;
  cursor: pointer;
  height: $rail-height !important;
  margin: #{$knob-radius - $rail-height/2 + $margin-top} 0px;
}

.slider__label-container {
  height: 1em; // todo
  line-height: 2em;
  position: relative;
}

.slider__range-label {
  //padding: $padding-label;
  position: absolute;
  color: $color-text-secondary;
  top: 50%;
  @include typography-label;
  &__min {
    transform: translate(-50%, -50%);
    left: 0;
  }
  &__max {
    transform: translate(50%, -50%);
    right: 0;
  }
}

.slider__rail {
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: $color-grey;
  border-radius: #{$rail-height / 2};
}
.slider__track {
  position: absolute;
  background-color: $color-teal;
  transition: all 0s;
  z-index: 1;
  width: 0;
  top: 0;
  left: 0;
  will-change: width;
  border-radius: 15px 0 0 15px;
  height: $rail-height;
  @include transition(width);
}
.slider__cursor__container {
  position: absolute;
  cursor: pointer;
  z-index: 3;
  left: 0;
  top: 0px;
  right: 0px;
  @include transition(left);
  &:hover .slider__range-label__top {
    opacity: 1;
  }
}
.slider__cursor {
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 9;
  @include transition(opacity, left);
}

.slider__knob {
}

.vue-slide-bar-range {
  display: flex;
  padding: 5px 0;
  justify-content: space-between;
}
.vue-slide-bar-separate {
  position: relative;
  width: 2px;
  background-color: #9e9e9e;
  height: 5px;
  cursor: pointer;
}
.vue-slide-bar-separate-text {
  text-align: center;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%, 0);
  top: 6px;
}
</style>