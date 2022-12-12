<template>
  <div
    :class="`tooltip ${
      position === 'top' ? 'tooltip--top' : 'tooltip--bottom'
    }`"
  >
    <span class="tooltip__label">
      <slot />
    </span>
    <div class="tooltip__arrow" />
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    position: {
      type: String,
      default: 'top',
      validate(value) {
        return value === 'top' || value === 'bottom'
      },
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles';

$arrowHeight: 5px;
$padding-label: 8px 10px;

.tooltip {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.08));
  &--top {
    flex-direction: column;
    & .tooltip__arrow {
      border-top: $arrowHeight solid;
    }
  }
  &--bottom {
    flex-direction: column-reverse;
    & .tooltip__arrow {
      border-bottom: $arrowHeight solid;
    }
  }
  &__arrow {
    width: 0;
    height: 0;
    border-left: $arrowHeight solid transparent;
    border-right: $arrowHeight solid transparent;
    bottom: 0;
    left: 0;
  }
  &__label {
    @include typography-label;
    white-space: nowrap;
    text-align: center;
    padding: $padding-label;
    border-radius: 5px;
    color: #fff;
    background-color: $color-ink;
    word-break: break-word;
  }
}
</style>