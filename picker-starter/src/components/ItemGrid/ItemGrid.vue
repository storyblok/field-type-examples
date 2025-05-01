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
        v-for="n in 12"
        :key="n"
        transition="fade"
      >
        <SkeletonCard />
      </GridItem>
    </template>
  </Grid>
</template>

<script lang="ts" setup>
import type { BasketItem } from '@/core'
import { Grid, GridItem, ItemCard, SkeletonCard } from '@/components'

// TODO prop for number of skeletons; pageSize
interface Props {
  items: BasketItem[]
  selectedItems: BasketItem[]
  loading?: boolean
  appendSkeletons?: boolean
  isLimitReached?: boolean
  onAdd: (item: BasketItem) => void
  onRemove: (item: BasketItem) => void
}
const props = withDefaults(defineProps<Props>(), {
  appendSkeletons: false,
})

const isSelected = (item: BasketItem) => {
  return props.selectedItems.some((selectedItem) => selectedItem.id === item.id)
}
const onClick = (item: BasketItem) => {
  isSelected(item) ? props.onRemove(item) : props.onAdd(item)
}
</script>

<style lang="scss" scoped>
@import '@/components/styles.scss';

.plugin-item-grid__card {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
