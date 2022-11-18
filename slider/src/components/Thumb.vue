<template>
  <div
    ref="thumb"
    :class="`thumb ${focused ? 'thumb--focused' : ''}`"
    @mousedown.stop="onClick"
    @touchstart.stop="onClick"
  >
    <slot />
    <Drag class="thumb__icon" />
  </div>
</template>

<script>
import Drag from '@/components/icons/Drag'
export default {
  name: 'Thumb',
  components: { Drag },
  props: {
    onClick: {
      type: Function,
      default: () => undefined,
    },
    focused: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';
$knob-radius: 13px;

.thumb {
  position: relative;
  border-radius: 50%;
  height: #{($knob-radius - 1px) * 2};
  width: #{($knob-radius - 1px) * 2};
  box-shadow: $box-shadow;
  border: $border;
  color: $color-grey;
  background: #ffffff;
  @include transition(color, background-color, border-color);
  &:hover,
  &:active,
  &.thumb--focused {
    color: $color-white;
    background-color: $color-teal;
    border-color: $color-white;
  }

  &:focus {
    //background-color: red;
    //outline: 3px solid #d9f4f3;
  }
}

.thumb--focused {
  outline: 3px solid #d9f4f3;
}

.thumb__icon {
  //transform: rotate(90deg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  height: 10px;
}
</style>