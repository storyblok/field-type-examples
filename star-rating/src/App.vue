<script setup lang="ts">
import StarRatingField from './components/StarRatingField.vue'
import FieldPluginProvider from './components/FieldPluginProvider.vue'
</script>

<template>
  <FieldPluginProvider>
    <template v-slot:loading><span>Loading...</span></template>
    <template v-slot:error><span>Error</span></template>

    <StarRatingField />
  </FieldPluginProvider>
</template>
