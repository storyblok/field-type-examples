<script setup lang="ts">
import { provide, reactive } from 'vue'
import {
  createFieldPlugin,
  FieldPluginResponse,
  FieldPluginData,
} from '@storyblok/field-plugin'
import { convertToRaw } from '../utils'

const plugin = reactive<FieldPluginResponse>({
  type: 'loading',
})
createFieldPlugin((newState) => {
  plugin.type = newState.type
  plugin.error = newState.error

  // Instead of replacing `plugin.data` which loses the reactive reference,
  // we're assigning each property into `plugin.data`.
  if (newState.type === 'loaded') {
    if (plugin.data) {
      const keys = Object.keys(newState.data) as Array<keyof FieldPluginData>
      keys.forEach((key) => {
        if (typeof plugin.data[key] === 'object') {
          // @ts-ignore not sure how to solve this
          Object.assign(plugin.data[key], newState.data[key])
        } else {
          // @ts-ignore not sure how to solve this
          plugin.data[key] = newState.data[key]
        }
      })
    } else {
      // @ts-ignore if `plugin.type` just became 'loaded', then `plugin.data` is still undefined.
      // So this is a valid else-branch.
      plugin.data = newState.data
    }
  }

  if (newState.actions) {
    plugin.actions = {
      ...newState.actions,
      setContent: (newContent: unknown) => {
        newState.actions.setContent(convertToRaw(newContent))
      },
    }
  } else {
    plugin.actions = undefined
  }
})
provide('field-plugin', plugin)
</script>

<template>
  <slot
    name="loading"
    v-if="plugin.type === 'loading'"
  ></slot>
  <slot
    name="error"
    v-if="plugin.type === 'error'"
  ></slot>
  <slot v-if="plugin.type === 'loaded'"></slot>
</template>
