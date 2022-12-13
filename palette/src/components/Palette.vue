<script>
import Swatch from './Swatch'

const defaultColors = [
  '#00B3B0',
  '#40C6C4',
  '#7FD9D7',
  '#D9F4F3',
  '#1B243F',
  '#545B6F',
  '#8D919F',
  '#C6C8CF',
  '#B1B5BE',
  '#DFE3E8',
  '#E7EAEE',
  '#EFF1F3',
  '#2DB47D',
  '#62C79E',
  '#96D9BE',
  '#CAECDE',
  '#395ECE',
  '#6B87DB',
  '#9CAEE6',
  '#CDD7F3',
  '#FBCE41',
  '#FCDB71',
  '#FDE6A0',
  '#FEF3CF',
  '#FFAC00',
  '#FFC140',
  '#FFD57F',
  '#FFEABF',
  '#FF6159',
  '#FF8983',
  '#FFB0AC',
  '#FFD7D5',
]

export default {
  props: {
    setValue: {
      type: Function,
      default: () => undefined,
    },
    value: {
      type: String,
      required: false,
      default: undefined,
    },
    size: {
      // small, medium, large
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    colors: {
      type: Array,
      default: defaultColors,
    },
  },
  render() {
    const { columns, colors, size, value, setValue } = this

    return (
      <div
        class="plugin-swatch-grid"
        style={`grid-template-columns: repeat(${columns}, 1fr)`}
      >
        {colors.map((color) => (
          <Swatch
            color={color}
            size={size}
            selected={color === value}
            setValue={setValue}
          />
        ))}
      </div>
    )
  },
}
</script>

<style scoped lang="scss">
.plugin-swatch-grid {
  display: flex;
  flex-wrap: wrap;
  //justify-items: start;
  //width: auto;
}
</style>