<template>
  <SbTextField
    id="example"
    :disabled="false"
    :placeholder="placeholder"
    :required="false"
    :value="modelValue"
    clearable
    icon-left="search"
    name="example"
    @input="handleInput($event.target.value)"
  />
</template>

<script lang="ts" setup>
import { SbTextField } from '@storyblok/design-system'

defineProps({
  placeholder: {
    type: String,
    required: false,
    default: undefined,
  },
  modelValue: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (value: string) => {
  emit('update:modelValue', value || '')
}
</script>
