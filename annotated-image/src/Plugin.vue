<template>
  <div>
    <div v-show="!modalIsOpen">
      <sb-asset-selector :uid="uid" field="image"></sb-asset-selector>
      <!-- Edit/Remove Buttons -->
      <div class="sbi-image-map__image-controls" v-if="model.image">
        <SbButton class="sbi-image-map__button" size="small" label="Edit annotations" @click="openModal" />
        <SbButton variant="danger" class="sbi-image-map__button" size="small" label="Remove image" @click="removeImage" />
      </div>
      <!-- Preview -->
      <div class="sbi-image-map__preview-wrapper" v-if="model.image">
        <!-- Preview -->
        <img :src="model.image" class="sbi-image-map__image-preview" />
        <ul class="sbi-image-map__nodes sbi-image-map__nodes">
          <li v-for="(node, index) in model.mapNodes" :key="index">
            <MapNode 
            :number=index 
            size="small"
            :node=node></MapNode>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modalIsOpen" @mouseup=stopDraggingNode>
      <div class="sbi-image-map__modal-wrapper">
        <div class="sbi-image-map__modal">
          <!-- Controls -->
          <div class="sbi-image-map__controls">
            <SbGroupButton size="small" hasSpaces variant="ghost">
              <SbButton size="small" icon="plus" label="Add annotation" @click=addNode />
              <SbButton icon="star" size="small" variant="danger" :disabled="pendingChanges" label="Save" @click=saveChanges />
              <SbButton icon="close" size="small" variant="danger" label="Close" @click=closeModal />
            </SbGroupButton>
          </div>
          <!-- Map -->
          <div class="sbi-image-map__image-wrapper" 
                @mousemove=dragNode>
            <img :src="model.image" class="sbi-image-map__image" ref="image" />
            <ul class="sbi-image-map__nodes">
              <li v-for="(node, index) in mapNodes" :key="index">
                <MapNode 
                :number=index 
                :dragging="isDragging(index)"
                :node=node
                @selectedNode="() => startDraggingNode(index)"
                @removeNode=removeNode
                @setDirection=setNodeDirection></MapNode>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SbButton from 'storyblok-design-system/src/components/Button'
import SbGroupButton from 'storyblok-design-system/src/components/GroupButton'
import MapNode from './MapNode.vue'

export default {
  mixins: [window.Storyblok.plugin],
  components: {
    SbButton,
    SbGroupButton,
    MapNode
  },
  data() {
    return {
      dragging: false,
      dragging_index: null,
      modalIsOpen: false,
      mapNodes: []
    }
  },
  methods: {
    initWith() {
      return {
        image: '',
        plugin: 'sbi-annotated-image',
        mapNodes: []
      }
    },
    pluginCreated() {
      if(!this.model.image && this.options.fallback_image) {
        setTimeout(() => this.model.image = this.options.fallback_image, 100)
      }
    },
    openModal(){
      this.mapNodes = JSON.parse(JSON.stringify(this.model.mapNodes))
      this.$emit('toggle-modal', true)
      this.modalIsOpen = true
    },
    saveChanges() {
      this.model.mapNodes = JSON.parse(JSON.stringify(this.mapNodes))
    },
    closeModal(){
      this.$emit('toggle-modal', false)
      this.modalIsOpen = false
    },
    startDraggingNode(index) {
      console.log('start dragging')
      this.dragging = true
      this.dragging_index = index
    },
    stopDraggingNode() {
      console.log('stop dragging')
      this.dragging = false
      this.dragging_index = null
    },
    dragNode(event) {
      if(this.dragging) {
        const imageRect = this.$refs.image.getBoundingClientRect()
        const delta_x = event.clientX - imageRect.left
        const delta_y = event.clientY - imageRect.top
        const x_coord = delta_x >= 0 && delta_x <= imageRect.width ? delta_x / imageRect.width : this.mapNodes[this.dragging_index].x
        const y_coord = delta_y >= 0 && delta_y <= imageRect.height ? delta_y / imageRect.height : this.mapNodes[this.dragging_index].y
        this.mapNodes[this.dragging_index].x = x_coord
        this.mapNodes[this.dragging_index].y = y_coord
        this.mapNodes = this.mapNodes.slice()
      }
    },
    addNode() {
      this.mapNodes = [...this.mapNodes, {x: 0.5, y: 0.5, direction: null}] 
    },
    removeNode(index) {
      this.mapNodes.splice(index, 1)
    },
    isDragging(index) {
      return index === this.dragging_index
    },
    removeImage() {
      this.model.image = ''
    },
    setNodeDirection(data) {
      this.mapNodes[data.index].direction = data.direction
      this.mapNodes = this.mapNodes.slice()
    }
  },
  computed: {
    pendingChanges() {
      return JSON.stringify(this.mapNodes) === JSON.stringify(this.model.mapNodes)
    }
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}
</script>

<style>
  .sbi-image-map__button {
    font-size: .9rem;
    margin-top: 20px;
    padding: 10px;
  }

  .sbi-image-map__image-controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .sbi-image-map__preview-wrapper {
    margin-top: 30px;
    position: relative;
  }

  .sbi-image-map__preview {
    display: block;
    width: 100%;
  }

  .sbi-image-map__image-wrapper {
    border: #cacaca;
    display: inline-block;
    margin-top: 30px;
    position: relative;
    user-select: none;
  }

  .sbi-image-map__image-wrapper * {
    user-select: none;
  }

  .sbi-image-map__image {
    display: block;
    max-height: 600px;
  }

  .sbi-image-map__nodes {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .sbi-image-map__close {
    display: block;
    margin: 0;
  }

  .sbi-image-map__modal {
    display: inline-block;
    max-width: 800px;
    margin: 0 auto;
  }

  .sbi-image-map__modal-wrapper {
    display: flex;
    justify-content: center;
  }
  </style>
