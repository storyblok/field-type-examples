<template>
  <HorizontalSlider
    :value="selectedValue"
    :set-value="(val) => setValue({ value: val })"
    :min-value="minValue"
    :max-value="maxValue"
    :marks="boundedMarks"
    :step-size="stepSize"
    :formatter="formatter"
  />
</template>

<script>
import { HorizontalSlider } from '@/components/HorizontalSlider'
import { numberFromString } from '@/utils'

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
    formatter() {
      try {
        return new Intl.NumberFormat(undefined, {
          minimumSignificantDigits: numberFromString(
            this.options.minimumSignificantDigits,
          ),
          maximumSignificantDigits: numberFromString(
            this.options.maximumSignificantDigits,
          ),
          // Use || to let empty strings default to undefined.
          unit: this.options.unit || undefined,
          style: this.options.style || undefined,
        })
      } catch (e) {
        console.error(e)
        return new Intl.NumberFormat(undefined, {})
      }
    },
    stepSize() {
      return numberFromString(this.options.stepSize) ?? 1
    },
    minValue() {
      return numberFromString(this.options.minValue) ?? 0
    },
    maxValue() {
      return numberFromString(this.options.maxValue) ?? 100
    },
    boundedMarks() {
      // Only those marks that are within the range
      return this.marks?.filter(
        (mark) => mark > this.minValue && mark < this.maxValue,
      )
    },
    defaultValue() {
      return numberFromString(this.options.defaultValue) ?? this.minValue
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
    selectedValue() {
      return typeof this.value?.value === 'number'
        ? this.value.value
        : this.defaultValue
    },
  },
  created() {
    if (typeof this.value?.value !== 'number') {
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
