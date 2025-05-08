<script lang="ts" setup>
import { SbNotification } from '@storyblok/design-system'
import { useErrorNotification } from '@/composables'

const { errorNotification } = useErrorNotification()
</script>

<template>
  <SbNotification
    v-if="errorNotification"
    :title="errorNotification.title"
    :description="errorNotification.message || ''"
    status="negative"
    is-full
  >
    <component
      :is="errorNotification.component"
      v-bind="errorNotification.props"
      v-if="errorNotification.component"
    />
  </SbNotification>
</template>
