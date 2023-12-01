<template>
  <Grid>
    <GridItem
      v-for="item in items"
      :key="item.id"
    >
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <SkeletonCard v-if="loading && !appendSkeletons" />
        <ItemCard
          v-else
          :item="item"
          :value="isSelected(item)"
          :disabled="!isSelected(item) && isLimitReached"
          class="plugin-item-grid__card"
          @click="() => onClick(item)"
        />
      </transition>
    </GridItem>
    <template v-if="loading && appendSkeletons">
      <GridItem
        v-for="n in parseInt(12)"
        :key="n"
        transition="fade"
      >
        <SkeletonCard />
      </GridItem>
    </template>
  </Grid>
</template>

<script>
import { ItemCard } from '../ItemCard'
import Grid from '../Grid/Grid.vue'
import GridItem from '../Grid/GridItem/GridItem.vue'
import SkeletonCard from '../SkeletonCard/SkeletonCard.vue'

// TODO prop for number of skeletons; pageSize
export default {
  name: 'ItemGrid',
  components: {
    SkeletonCard,
    ItemCard,
    Grid,
    GridItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: true,
    },
    loading: Boolean,
    appendSkeletons: {
      type: Boolean,
      default: false,
    },
    isLimitReached: Boolean,
    onAdd: {
      type: Function,
      required: true,
    },
    onRemove: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClick(item) {
      this.isSelected(item) ? this.onRemove(item) : this.onAdd(item)
    },
    isSelected(item) {
      return this.selectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles.scss';

.plugin-item-grid__card {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
