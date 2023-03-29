<template>
  <HorizontalSlider
    :value="selectedValue"
    :set-value="(val) => setValue({ value: val })"
    :min-value="minValue"
    :max-value="maxValue"
    :marks="boundedMarks"
    :step-size="stepSize"
  />
</template>

<script>
import { HorizontalSlider } from '@/components/HorizontalSlider'

export default {
  components: {
    HorizontalSlider,
  },
  props: {
    options: {
      type: Object,
      default: undefined,
    },
    setValue: {
      type: Function,
      default: () => undefined,
    },
    value: {
      type: Object,
      default: undefined,
    },
  },

  computed: {
    stepSize() {
      return this.options.stepSize
        ? Number.parseFloat(this.options.stepSize)
        : 1
    },
    minValue() {
      return this.options.minValue
        ? Number.parseFloat(this.options.minValue)
        : 0
    },
    maxValue() {
      return this.options.maxValue
        ? Number.parseFloat(this.options.maxValue)
        : 100
    },
    boundedMarks() {
      // Only those marks that are within the range
      return this.marks?.filter(
        (mark) => mark > this.minValue && mark < this.maxValue,
      )
    },
    selectedValue() {
      return this.value?.value ?? this.defaultValue
    },
    defaultValue() {
      return this.options.defaultValue
        ? Number.parseFloat(this.options.defaultValue)
        : this.minValue
    },
    marks() {
      try {
        const marks = JSON.parse(this.options.marks)
        if (!Array.isArray(marks)) {
          return undefined
        }
        if (!marks.every((it) => typeof it === 'number')) {
          return undefined
        }
        return marks
      } catch (e) {
        return undefined
      }
    },
  },
  created() {
    if (!this.value?.value) {
      this.setValue({ value: this.defaultValue })
    }
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 62.5%;
}
</style>