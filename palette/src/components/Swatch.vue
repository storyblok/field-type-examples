<script>
import Checkmark from '@/components/Checkmark'

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
          style={`background-color: ${color}`}
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
  height: 10px;
  width: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-swatch__checkmark {
  color: #ffffff;
  height: $small-size;
}
</style>
