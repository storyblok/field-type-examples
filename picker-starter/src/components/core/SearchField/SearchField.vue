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

<script>
import { SbTextField } from '@storyblok/design-system'

export default {
  name: 'SearchField',
  components: {
    SbTextField,
  },
  props: {
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
  },
  watch: {
    value(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('update:modelValue', value || '')
    },
  },
}
</script>

<style scoped></style>
