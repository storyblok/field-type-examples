<script>
import Checkmark from '@/components/Checkmark'
import { colorContrast, hexToRgb } from '@/utils'

const white = '#FFFFFF'
const ink = '#1b243f'
const divider = '#DFE3E8'
const transparent = 'transparent'

const darkColor = (hexColor) => {
  const blackRgb = { r: 0, g: 0, b: 0 }
  const contrast = colorContrast(hexToRgb(hexColor) ?? blackRgb, blackRgb)
  return contrast < 0.1
}

const contrastText = (hexColor) => {
  return darkColor(hexColor) ? ink : white
}
const contrastBorder = (hexColor) => {
  return darkColor(hexColor) ? divider : transparent
}

export default {
  name: 'Swatch',
  props: {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    setValue: {
      type: Function,
      default: () => undefined,
    },
  },
  render() {
    const { size, color, selected, setValue } = this
    return (
      <div
        class={`plugin-swatch plugin-swatch--${size} ${
          selected ? 'plugin-swatch--selected' : ''
        }`}
      >
        <div
          class="plugin-swatch__button"
          style={{
            backgroundColor: color,
            color: contrastText(this.color),
            borderColor: contrastBorder(this.color),
          }}
          onClick={() =>
            this.selected ? setValue(undefined) : setValue(color)
          }
        >
          {selected && <Checkmark class="plugin-swatch__checkmark" />}
        </div>
      </div>
    )
  },
}
</script>

<style scoped lang="scss">
$small-size: 20px;

.plugin-swatch {
  padding: 10px;

  &--small {
    border-radius: 5px;
    padding: 15px;

    & .plugin-swatch__button {
      width: $small-size;
      height: $small-size;
      border-radius: 5px;
    }

    &:not(.plugin-swatch--selected) {
      border: 1px solid transparent;
    }

    &.plugin-swatch--selected {
      border: 1px solid #00b3b0;
    }
  }

  &--medium {
    border-radius: 5px;
    padding: 5px;

    & .plugin-swatch__button {
      width: 36px;
      height: 36px;
      border-radius: 5px;
    }
  }

  &--large {
    border-radius: 0px;
    padding: 0px;
    width: 100%;

    & .plugin-swatch__button {
      height: $small-size;
      width: 100%;
      border-radius: 0px;
    }
  }
}

.plugin-swatch__button {
  color: #ffffff;
  border: 1px solid transparent;
  height: 10px;
  width: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-swatch__checkmark {
  height: $small-size;
}
</style>
