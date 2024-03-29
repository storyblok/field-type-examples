<template>
  <div class="plugin-item-grid">
    <SearchField
      :placeholder="`Search ${itemService.label}`"
      :model-value="queryState.query.searchTerm"
      @update:model-value="handleSearchTermChange"
    />
    <div class="plugin-toolbar">
      <div class="plugin-query-container">
        <SelectFilter
          v-for="filterItem in queryState.filterList"
          :key="filterItem.name"
          :filter-item="filterItem"
          :model-value="queryState.query.filterSelection[filterItem.name]"
          @update:model-value="
            (value) => handleFilterSelectionChange(filterItem.name, value)
          "
        />
      </div>
      <ViewModeSwitch
        v-model="itemView"
        class="plugin-view-mode-switch"
      />
    </div>
    <EmptyScreen
      v-if="isPageEmpty"
      :icon="EmptySearchIcon"
      :description="`We could not find any ${itemService.label}.`"
      title="No results found"
    />
    <template v-else>
      <ItemGrid
        v-if="itemView === 'grid'"
        :items="queryState.items"
        :selected-items="basket.items"
        :is-limit-reached="isLimitReached"
        :loading="isLoadingItems"
        :append-skeletons="!showPagePagination"
        :on-remove="basket.remove"
        :on-add="basket.addItem"
      />
      <ItemList
        v-if="itemView === 'list'"
        :items="queryState.items"
        :selected-items="basket.items"
        :is-limit-reached="isLimitReached"
        :loading="isLoadingItems"
        :append-skeletons="!showPagePagination"
        :on-remove="basket.remove"
        :on-add="basket.addItem"
      />
    </template>
    <SbPagination
      v-if="showPagePagination"
      :model-value="queryState.query.page"
      :per-page="queryState.query.perPage"
      :total="queryState.pageInfo.totalCount"
      carousel
      class="plugin-item-grid__pagination"
      @update:model-value="handlePageClick"
    />
    <SbButton
      v-if="showCursorPagination"
      :is-disabled="disableLoadMore"
      label="Load more..."
      class="plugin-item-grid__load-more"
      variant="tertiary"
      @click="handleLoadMoreClick"
    />
  </div>
</template>

<script>
import { ItemGrid } from '../ItemGrid'
import { ItemList } from '../ItemList'
import { SbPagination, SbButton } from '@storyblok/design-system'
import debounce from 'debounce'
import EmptyScreen from '../EmptyScreen/EmptyScreen.vue'
import ViewModeSwitch from '../ViewModeSwitch/ViewModeSwitch.vue'
import { SearchField, SelectFilter } from '../Filter'
import { EmptySearchIcon } from '../Icons'
import { reducerMixin } from '../ItemPicker/utils/mixin/mixin.ts'
import { throttleMs } from '@/settings'

export default {
  name: 'ItemPicker',
  components: {
    ViewModeSwitch,
    SearchField,
    EmptyScreen,
    SbPagination,
    ItemGrid,
    SbButton,
    ItemList,
    SelectFilter,
  },
  mixins: [reducerMixin],
  inject: {
    notify: { default: () => undefined },
  },
  props: {
    basket: {
      type: Object,
      required: true,
    },
    itemService: {
      type: Object,
      required: true,
    },
    isLimitReached: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Presentational
      itemView: 'grid',
    }
  },
  computed: {
    EmptySearchIcon() {
      return EmptySearchIcon
    },
  },
  created() {
    this.init()
  },
  methods: {
    handleLoadMoreClick() {
      this.dispatch({
        type: 'loadMore',
      })
      this.queryItems()
    },
    handlePageClick(page) {
      this.dispatch({
        type: 'loadPage',
        page,
      })
      this.queryItems()
    },
    handleFilterSelectionChange(name, value) {
      this.dispatch({
        type: 'setFilterSelection',
        name,
        value,
      })
      this.queryItems()
    },
    handleSearchTermChange(newSearchTerm) {
      this.dispatch({
        type: 'setSearchTerm',
        searchTerm: newSearchTerm,
      })
      this.debouncedQueryItems()
    },
    debouncedQueryItems: debounce(function () {
      // Must not be an arrow function, so that this has the correct binding
      this.queryItems()
    }, throttleMs),
    async queryItems() {
      const res = await this.itemService
        .query(this.queryState.query)
        .catch((error) => error)

      if (res instanceof Error) {
        this.notify({
          title: `Failed to fetch ${this.itemService.label}`,
          description: `Something went wrong when fetching ${this.itemService.label}.`,
          error: new Error(res),
        })
        this.dispatch({
          type: 'receiveError',
          error: res,
        })
        return
      }
      this.dispatch({
        type: 'receiveItems',
        response: res,
      })
    },
    async queryFilters() {
      const getFilters = () =>
        this.itemService.getFilters?.() ?? Promise.resolve([])

      const res = await getFilters().catch((error) => error)

      if (res instanceof Error) {
        // Silent notification; the application will still function, so do not show error to the user
        console.error('Failed to Fetch Filters', res)
      }

      this.dispatch({
        type: 'receiveFilters',
        filterList: res,
      })
    },
    async init() {
      this.dispatch({
        type: 'requestFilters',
      })
      await this.queryFilters()
      await this.queryItems()
    },
  },
}
</script>

<style scoped lang="scss">
.plugin-item-grid {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.plugin-toolbar {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.plugin-query-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

.plugin-view-mode-switch {
  align-self: flex-start;
}

.plugin-item-grid__pagination {
  align-self: center;
  justify-self: center;
  width: auto;
}

.plugin-item-grid__load-more {
  align-self: center;
  justify-self: center;
}
</style>
