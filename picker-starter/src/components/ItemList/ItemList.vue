<template>
  <List>
    <ListItem
      v-for="item in items"
      :key="item.id"
    >
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <SkeletonListItem v-if="loading && !appendSkeletons" />
        <ItemListItem
          v-else
          :key="item.id"
          :item="item"
          :value="isSelected(item)"
          :disabled="!isSelected(item) && isLimitReached"
          @click="() => onClick(item)"
        />
      </transition>
    </ListItem>
    <template v-if="loading && appendSkeletons">
      <ListItem
        v-for="n in 12"
        :key="n"
      >
        <transition
          name="fade"
          mode="out-in"
          appear
        >
          <SkeletonListItem />
        </transition>
      </ListItem>
    </template>
  </List>
</template>

<script setup lang="ts">
import type { BasketItem } from '@/core'
import { List, ListItem, ItemListItem, SkeletonListItem } from '@/components'

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
