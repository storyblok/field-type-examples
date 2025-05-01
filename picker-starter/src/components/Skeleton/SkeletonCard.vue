<template>
  <Card>
    <CardContent>
      <Skeleton
        variant="rectangle"
        class="plugin-skeleton-card__content"
      />
    </CardContent>
    <CardFooter>
      <Skeleton />
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardFooter, CardContent, Skeleton } from '@/components'
</script>

<style scoped>
.plugin-skeleton-card__content {
  width: 100%;
  height: 100%;
}
</style>
