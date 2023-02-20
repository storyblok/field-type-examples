<template>
  <HorizontalSlider
    :value="selectedValue"
    :set-value="(val) => setValue({ value: val })"
    :min-value="minValue"
    :max-value="maxValue"
    :marks="filteredMarks"
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
    minValue() {
      return this.getMinValue()
    },
    maxValue() {
      return this.getMaxValue()
    },
    filteredMarks() {
      const marks = this.getMarks()
      return this.filterInvalidMarks(marks)
    },
    selectedValue() {
      return this.value?.value ?? this.defaultValue()
    },
    defaultValue() {
      return this.options.defaultValue
        ? Number.parseFloat(this.options.defaultValue)
        : this.minValue
    },
  },

  created() {
    if (!this.value?.value) {
      this.setValue({ value: this.defaultValue })
    }
  },
  methods: {
    getMinValue() {
      return this.options.minValue
        ? Number.parseFloat(this.options.minValue)
        : 0
    },
    getMaxValue() {
      return this.options.maxValue
        ? Number.parseFloat(this.options.maxValue)
        : 100
    },
    getMarks() {
      return typeof this.options.marks === 'undefined'
        ? undefined
        : JSON.parse(this.options.marks)
    },
    filterInvalidMarks(marks) {
      if (!Array.isArray(marks)) {
        return marks
      }
      return marks.filter(
        (mark) => mark > this.minValue && mark < this.maxValue,
      )
    },
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 62.5%;
}
</style>