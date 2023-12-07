<template>
  <ModalContainer>
    <template #header>
      <ModalHeader
        :title="title"
        :close-modal="closeModal"
      >
        <template
          v-if="icon"
          #icon
        >
          <component :is="icon" />
        </template>
        <template #actions>
          <ViewCartButton
            :size="basket.size()"
            :disabled="activeTab === 'basket'"
            :max-items="maxItems"
            @click="activeTab = 'basket'"
          />
          <SbButton
            class="plugin-modal-layout__done-button"
            variant="primary"
            size="small"
            label="Done"
            icon="check"
            @click.prevent="closeModal"
          />
        </template>
      </ModalHeader>
    </template>
    <template #main>
      <SbTabs
        v-model="activeTab"
        :show-add-button="false"
        :type="null"
      >
        <SbTab
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        />
      </SbTabs>
      <div class="sb-tab-panels">
        <SbTabPanels v-model="activeTab">
          <SbTabPanel
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
          >
            <ItemPicker
              :item-service="tab"
              :basket="basket"
              :is-limit-reached="isLimitReached"
            />
          </SbTabPanel>
          <SbTabPanel name="basket">
            <EmptyScreen
              v-if="basket.isEmpty()"
              :icon="NoItemsIcon"
              title="No items added"
              description="Added items will be listed here"
            />
            <CartList
              v-else
              :basket="basket"
            />
          </SbTabPanel>
        </SbTabPanels>
      </div>
    </template>
  </ModalContainer>
</template>

<script>
import { ModalHeader } from '../ModalHeader'
import { ModalContainer } from '../ModalContainer'
import { ViewCartButton } from '../ViewCartButton'
import {
  SbTab,
  SbTabs,
  SbTabPanel,
  SbTabPanels,
  SbButton,
} from '@storyblok/design-system'
import { ItemPicker } from '../ItemPicker'
import { CartList } from '../CartList'
import { EmptyScreen } from '../EmptyScreen'
import { NonItemsAddedIcon } from '../Icons'
import { getTabs } from '../ModalPage/getTabs'

export default {
  name: 'ModalPage',
  components: {
    SbButton,
    CartList,
    ViewCartButton,
    ModalHeader,
    ModalContainer,
    SbTab,
    SbTabs,
    SbTabPanel,
    SbTabPanels,
    EmptyScreen,
    ItemPicker,
  },
  props: {
    basket: {
      type: Object,
      required: true,
    },
    pickerService: {
      type: Object,
      required: true,
    },
    closeModal: {
      type: Function,
      default: () => undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    icon: {
      type: Object,
      default: undefined,
    },
    selectOnly: {
      type: String,
      default: undefined,
    },
    maxItems: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      activeTab: this.initialActiveTab(),
    }
  },

  computed: {
    NoItemsIcon() {
      return NonItemsAddedIcon
    },
    tabs() {
      return getTabs(this.pickerService, this.selectOnly)
    },
    isLimitReached() {
      return this.maxItems <= this.basket.size()
    },
  },
  methods: {
    initialActiveTab() {
      return getTabs(this.pickerService, this.selectOnly)?.[0]?.name
    },
  },
}
</script>
