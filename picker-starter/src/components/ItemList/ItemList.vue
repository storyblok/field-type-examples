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
        v-for="n in parseInt(12)"
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

<script>
import List from '../List/List.vue'
import ItemListItem from '../ItemListItem/ItemListItem.vue'
import ListItem from '../List/ListItem/ListItem.vue'
import SkeletonListItem from '../SkeletonListItem/SkeletonListItem.vue'

export default {
  name: 'ItemList',
  components: {
    SkeletonListItem,
    ListItem,
    ItemListItem,
    List,
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
      return this.isSelected(item) ? this.onRemove(item) : this.onAdd(item)
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
