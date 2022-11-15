<template>
  <div class="knob">
    <Drag class="knob__drag" />
  </div>
</template>

<script>
import Drag from '@/components/icons/Drag'
export default {
  name: 'Thumb',
  components: { Drag },
}
</script>

<style scoped lang="scss">
@import '../styles';
$knob-radius: 13px;
$rail-height: 6px;

.knob {
  position: absolute;
  border-radius: 50%;
  height: #{($knob-radius - 1px) * 2};
  width: #{($knob-radius - 1px) * 2};
  box-shadow: $box-shadow;
  border: $border;
  left: 0;
  top: $rail-height / 2;
  transform: translate(-50%, -50%);
  color: $color-grey;
  background: #ffffff;
  @include transition(color, background-color, border-color);
  &:hover,
  &:active {
    color: $color-white;
    background-color: $color-teal;
    border-color: $color-white;
  }
}

.knob__drag {
  //transform: rotate(90deg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  height: 10px;
}
</style>