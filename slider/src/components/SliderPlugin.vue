<script>
import { HorizontalSlider } from '@/components/HorizontalSlider'

export default {
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
    defaultValue() {
      return this.options.defaultValue
        ? Number.parseFloat(this.options.defaultValue)
        : 0
    },
  },
  created() {
    const defaultValue = parseFloat(this.defaultValue)
    if (!this.value?.value) {
      this.setValue({ value: defaultValue })
    }
  },
  render() {
    const minValue = this.options.minValue
      ? Number.parseFloat(this.options.minValue)
      : undefined
    const maxValue = this.options.maxValue
      ? Number.parseFloat(this.options.maxValue)
      : undefined
    // TODO: if default is not present take minValue
    const value = this.value?.value || this.defaultValue
    const marks =
      typeof this.options.marks === 'undefined'
        ? undefined
        : JSON.parse(this.options.marks)
    return (
      <HorizontalSlider
        // archAngle={archAngle}
        value={value}
        setValue={(value) => this.setValue({ value })}
        minValue={minValue}
        maxValue={maxValue}
        marks={marks}
      />
    )
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 62.5%;
}
</style>