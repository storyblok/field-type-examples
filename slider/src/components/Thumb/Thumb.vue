<template>
  <div
    ref="thumb"
    :class="`thumb ${focused ? 'thumb--focused' : ''}`"
    @mousedown.stop="onClick"
    @touchstart.stop="onClick"
  >
    <slot />
    <div class="thumb_drag">
      <div class="thumb_bar" />
      <div class="thumb_bar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thumb',
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
@import '../../styles';
$knob-radius: 13px;

.thumb {
  position: relative;
  border-radius: 50%;
  height: #{($knob-radius - 1px) * 2};
  width: #{($knob-radius - 1px) * 2};
  box-shadow: $box-shadow;
  border: $border;
  color: $color-grey;
  background-color: #ffffff;
  @include transition(color, background-color, border-color);
  &:hover,
  &:active,
  &.thumb--focused {
    color: $color-white;
    background-color: $color-teal;
    border-color: $color-white;
  }
  &:active {
    box-shadow: 0px 2px 17px 3px transparent;
  }
}

.thumb--focused {
  box-shadow: 0 0 0 3px #d9f4f3;
}

.thumb_drag {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 4px;
}

.thumb_bar {
  $bar-width: 1px;
  width: $bar-width;
  border-radius: $bar-width;
  height: 10px;
  background-color: currentColor;
}
</style>