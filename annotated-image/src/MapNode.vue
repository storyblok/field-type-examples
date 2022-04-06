<template>
  <div :class="['map-node', node.direction && `map-node--with-line map-node--with-line-${node.direction}`, size === 'small' && 'map-node--small', dragging && 'map-node--dragging', editing && 'map-node--editing']" :style=nodePosition()>
      <div class="map-node__number-wrapper">
        <div class="map-node__number" @mousedown=startDragging>{{ number + 1 }}</div>
        <SbButton
          v-if="size !== 'small'"
          icon="delete"
          is-rounded
          has-icon-only
          variant="ghost"
          @click=removeNode
          class="map-node__close"
        />
        <SbButton
          v-if="size !== 'small'"
          icon="edit"
          is-rounded
          has-icon-only
          variant="ghost"
          @click=toggleEditing
          class="map-node__edit-direction"
        />
        <SbButton
          v-if="size !== 'small'"
          icon="close"
          is-rounded
          has-icon-only
          variant="ghost"
          @click=toggleEditing
          class="map-node__clear-direction"
        />
        <button @click="() => setDirection(item)" v-for="item in directions" :key="item" :class="['map-node__direction', `map-node__direction--${item}`, node.direction == item ? 'map-node__direction--active' : '']"></button>
      </div>
    </div>
</template>

<script>
import SbButton from 'storyblok-design-system/src/components/Button'

export default {
  components: {
    SbButton
  },
  data: () => {
    return {
      editing: false,
      directions: ['top', 'right', 'left', 'bottom', 'bottom-right', 'bottom-left', 'top-left', 'top-right']
    }
  },
  props: ['node', 'number', 'size', 'dragging'],
  methods: {
    nodePosition() {
      return `top: ${this.node.y * 100}%; left: ${this.node.x * 100}%`
    },
    removeNode() {
      this.$emit('removeNode', this.number)
    },
    setDirection(direction) {
      if(this.node.direction === direction) {
        direction = null
      }
      this.$emit('setDirection', {index: this.number, direction})
    },
    toggleEditing() {
      this.editing = !this.editing
    },
    startDragging() {
      this.$emit('selectedNode', this.number)
    }
  }
}
</script>

<style>
  .map-node {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 5%;
  }

  .map-node__close {
    height: 16px;
    min-height: unset;
    opacity: 0;
    padding: 0;
    position: absolute;
    right: -10px;
    top: -10px;
    width: 16px;
  }

  .map-node--editing .map-node__close {
    right: -25px;
    top: -25px;
  }

  .map-node__edit-direction {
    height: 16px;
    min-height: unset;
    opacity: 0;
    padding: 0;
    position: absolute;
    right: -10px;
    bottom: -10px;
    width: 16px;
  }

  .map-node:hover .map-node__close,
  .map-node:hover .map-node__edit-direction {
    opacity: 1;
  }

  .map-node__clear-direction {
    bottom: -25px;
    height: 16px;
    min-height: unset;
    opacity: 0;
    padding: 0;
    position: absolute;
    right: -25px;
    width: 16px;
  }

  .map-node--editing .map-node__clear-direction {
    opacity: 1;
  }

  .map-node__number-wrapper {
    font-size: 1.2rem;
    height: 18px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
  }

  .map-node__number {
    align-items: center;
    background-color: #fd5fae;
    border-radius: 50%;
    color: #fff;
    display: flex;
    height: 100%;
    font-size: 12px;
    font-weight: 700;
    justify-content: center;
    width: 100%;
  }

  .map-node__number:hover {
    cursor: grab;
  }

  .map-node--dragging .map-node__number:hover {
    cursor: grabbing;
  }

  .map-node__direction {
    background-color: rgb(143, 143, 143);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 10px; 
    padding: 0;
    position: absolute;
    transform-origin: center;
    transition: .1s all linear;
    width: 10px; 
  }

  .map-node__direction--active {
    background-color: #fd5fae;
  }

  .map-node:not(.map-node--editing) .map-node__direction {
    left: 50%;
    opacity: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .map-node--editing .map-node__direction {
    opacity: 1;
    z-index: 3;
  }

  .map-node--editing .map-node__direction--top {
    left: 50%;
    top: -14px;
    transform: translateX(-50%);
  }

  .map-node--editing .map-node__direction--left {
    left: -18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .map-node--editing .map-node__direction--right {
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .map-node--editing .map-node__direction--bottom {
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
  }

  .map-node--editing .map-node__direction--bottom-right {
    bottom: -7px;
    right: -7px;
  }

  .map-node--editing .map-node__direction--bottom-left {
    bottom: -7px;
    left: -7px;
  }

  .map-node--editing .map-node__direction--top-left {
    top: -7px;
    left: -7px;
  }

  .map-node--editing .map-node__direction--top-right {
    top: -7px;
    right: -7px;
  }

  .map-node--editing .map-node__edit-direction {
    display: none;
  }

  .map-node--with-line:after {
    content: '';
    display: block;
    background-color: #fd5fae;
    height: 0;
    left: calc(50% - 1px);
    padding-top: 78%;
    position: absolute;
    transform-origin: top center;
    top: 50%;
    width: 3px;
    z-index: -1;
  }

  .map-node--with-line-top:after {
    transform: rotate(180deg);
  }

  .map-node--with-line-right:after {
    transform: rotate(-90deg);
  }

  .map-node--with-line-bottom-right:after {
    transform: rotate(-45deg);
  }

  .map-node--with-line-top-right:after {
    transform: rotate(-135deg);
  }

  .map-node--with-line-left:after {
    transform: rotate(90deg);
  }

  .map-node--with-line-top-left:after {
    transform: rotate(135deg);
  }

  .map-node--with-line-bottom-left:after {
    transform: rotate(45deg);
  }

  .map-node--small .map-node__number-wrapper {
    font-size: .3rem;
    height: 9px;
    width: 9px;
  }

  .map-node--small.map-node--with-line:after {
    padding-top: calc(5px + 40%);
    width: 2px;
  }
</style>
