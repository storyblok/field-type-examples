<script>
import Slider from './Slider'

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
    console.log('value', this.value.value)
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
    const archAngle = this.options.archAngle
      ? Number.parseFloat(this.options.archAngle)
      : 180
    const isArch = typeof this.options.archAngle !== 'undefined'
    const value = this.value?.value ?? this.defaultValue
    return (
      <Slider
        archAngle={archAngle}
        value={value}
        setValue={(value) => this.setValue({ value })}
        isArch={isArch}
        minValue={minValue}
        maxValue={maxValue}
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