<template>
  <ModalContainer>
    <template #header>
      <ModalHeader :title="title">
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
      <ErrorNotification v-if="errorNotification?.location === 'modal'" />
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
              icon="package-minus"
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

<script setup>
import { ref, computed } from 'vue'
import {
  SbTab,
  SbTabs,
  SbTabPanel,
  SbTabPanels,
  SbButton,
} from '@storyblok/design-system'

import {
  ModalContainer,
  ModalHeader,
  CartList,
  ViewCartButton,
  EmptyScreen,
  ErrorNotification,
  ItemPicker,
} from '@/components'

import { useErrorNotification } from '@/composables'

const props = defineProps({
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
  maxItems: {
    type: Number,
    default: undefined,
  },
})

const { errorNotification } = useErrorNotification()

const activeTab = ref(props.pickerService.tabs[0]?.name)

const tabs = computed(() => props.pickerService.tabs)
const isLimitReached = computed(() => props.maxItems <= props.basket.size())
</script>
