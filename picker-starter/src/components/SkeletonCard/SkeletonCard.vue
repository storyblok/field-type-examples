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

<script>
import { Skeleton } from '../Skeleton'
import { Card, CardFooter, CardContent } from '../Card'

export default {
  name: 'SkeletonCard',
  components: {
    Card,
    CardFooter,
    CardContent,
    Skeleton,
  },
}
</script>

<style scoped>
.plugin-skeleton-card__content {
  width: 100%;
  height: 100%;
}
</style>
