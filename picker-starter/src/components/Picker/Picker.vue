<template>
  <NotificationProvider>
    <ValidationError
      v-if="validationResult.error"
      :validation-result="validationResult"
    />
    <ErrorNotification
      v-else-if="errorNotification && errorNotification.location === 'main'"
      :title="errorNotification.title"
      :message="errorNotification.message"
    >
      <component
        :is="errorNotification.component"
        v-bind="errorNotification.props"
        v-if="errorNotification.component"
      />
    </ErrorNotification>
    <template v-else>
      <ModalPage
        v-if="isModalOpen"
        :options="unvalidatedOptions"
        :icon="icon || null"
        :title="title"
        :basket="basket"
        :picker-service="pickerService"
        :close-modal="closeModal"
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
  ErrorNotification,
} from '../'
import { createBasket } from '@/core'
import '@storyblok/design-system/dist/storyblok-design-system.css'
import { pluginPropsDef } from './pluginPropsDef'
import { numberFromString } from '@/utils'
import { useErrorNotification } from '@/composables'

export default {
  name: 'Picker',
  components: {
    ValidationError,
    NonModalPage,
    ModalPage,
    NotificationProvider,
    ErrorNotification,
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
    makeService: {
      type: Function,
      required: true,
    },
    ...pluginPropsDef,
  },
  data() {
    return {
      errorNotification: null,
    }
  },
  computed: {
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
        return this.makeService(this.unvalidatedOptions)
      } catch (error) {
        throw new Error(`The plugin cannot be loaded. ${error.stack}`)
      }
    },
    pickerService() {
      return this.validationResult.value
    },
    basket() {
      return createBasket(this.items, (getItems) =>
        this.setItems(getItems(this.items)),
      )
    },
  },
  created() {
    const { errorNotification } = useErrorNotification()
    this.errorNotification = errorNotification
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
