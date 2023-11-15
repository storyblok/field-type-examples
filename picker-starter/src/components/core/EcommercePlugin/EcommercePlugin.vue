<template>
  <NotificationProvider>
    <ValidationError
      v-if="validationResult.error"
      :validation-result="validationResult"
    />
    <template v-else>
      <ModalPage
        v-if="isModalOpen"
        :options="unvalidatedOptions"
        :icon="icon || null"
        :title="title"
        :basket="basket"
        :e-commerce-service="eCommerceService"
        :close-modal="closeModal"
        :select-only="selectOnly"
        :max-items="maxItems"
      />
      <NonModalPage
        v-else
        :basket="basket"
        :open-modal="openModal"
        :max-items="maxItems"
      />
    </template>
  </NotificationProvider>
</template>

<script>
import {
  ModalPage,
  NonModalPage,
  ValidationError,
  NotificationProvider,
} from '../'
import { createBasket } from '../ecommerce'
import '@storyblok/design-system/dist/storyblok-design-system.css'
import { pluginPropsDef } from './pluginPropsDef'
import { numberFromString } from '../../../utils'

export default {
  name: 'EcommercePlugin',
  components: {
    ValidationError,
    NonModalPage,
    ModalPage,
    NotificationProvider,
  },
  props: {
    icon: {
      type: Object,
      required: false,
      default: undefined,
    },
    title: {
      type: String,
      default: null,
    },
    unvalidatedOptions: {
      type: Object,
      required: true,
    },
    makeECommerceService: {
      type: Function,
      required: true,
    },
    ...pluginPropsDef,
  },
  computed: {
    selectOnly() {
      return this.unvalidatedOptions.selectOnly
    },
    maxItems() {
      return this.unvalidatedOptions.limit === ''
        ? undefined
        : numberFromString(this.unvalidatedOptions.limit)
    },
    items() {
      return this.value.items ?? []
    },
    validationResult() {
      try {
        return this.makeECommerceService(this.unvalidatedOptions)
      } catch (error) {
        throw new Error(`The plugin cannot be loaded. ${error.stack}`)
      }
    },
    eCommerceService() {
      return this.validationResult.value
    },
    basket() {
      return createBasket(this.items, (getItems) =>
        this.setItems(getItems(this.items)),
      )
    },
  },
  methods: {
    setItems(items) {
      this.setValue({
        items,
      })
    },
    openModal() {
      this.setModalOpen(true)
    },
    closeModal() {
      this.setModalOpen(false)
    },
  },
}
</script>

<style>
/* Global styles */

body {
  /* Prevents flickering horizontal scroll bar */
  overflow: hidden;
}
</style>
