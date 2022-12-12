<script>
import Palette from '@/components/Palette'

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
  created() {
    const defaultValue = this.options.defaultValue
    if (!this.value?.value) {
      this.setValue({ value: defaultValue })
    }
  },
  render() {
    const defaultValue = this.options.defaultValue
    const colors =
      typeof this.options.colors === 'undefined'
        ? undefined
        : JSON.parse(this.options.colors)
    return (
      <Palette
        setValue={(value) => this.setValue({ value })}
        value={this.value?.value ?? defaultValue}
        size={this.options.size}
        colors={colors}
      />
    )
  },
}
</script>

<style scoped lang="scss">
</style>