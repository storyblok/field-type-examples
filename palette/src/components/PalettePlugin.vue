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
    },
    value: {
      type: Object,
    },
  },
  render() {
    const defaultValue = this.options.defaultValue
    return (
      <Palette
        setValue={(value) => this.setValue({ value })}
        value={this.value?.value ?? defaultValue}
        size={this.options.size}
        colors={JSON.parse(this.options.colors)}
      />
    )
  },
}
</script>

<style scoped lang="scss">
</style>