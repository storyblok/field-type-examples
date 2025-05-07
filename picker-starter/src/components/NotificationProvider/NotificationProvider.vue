<template>
  <div class="plugin-notification-provider">
    <SbNotification
      :class="`plugin-notification ${
        visible ? 'plugin-notification--visible' : ''
      }`"
      :title="notification.title"
      :description="notification.description"
      status="negative"
    />
    <slot />
  </div>
</template>

<script>
import { SbNotification } from '@storyblok/design-system'

export default {
  name: 'NotificationProvider',
  components: {
    SbNotification,
  },
  provide() {
    return {
      notify: (notification) => {
        clearTimeout(this.timeoutId)
        console.error(notification.error)
        this.visible = true
        this.notification = notification
        this.timeoutId = setTimeout(() => {
          this.visible = false
        }, 3000)
      },
    }
  },
  data() {
    return {
      notification: {
        title: '',
        description: '',
        details: undefined,
      },
      visible: false,
      timeoutId: undefined,
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId)
  },
}
</script>

<style scoped lang="scss">
@import '@/components/styles.scss';

.plugin-notification {
  position: absolute;
  z-index: 1000;
  left: 50vw;
  //transform: translate(-50%, -100%) ;
  transform: translate(-50%, 0%) scale(0.75, 0.5625);
  opacity: 0;
  transition: $move-fade-transition;
  box-shadow: 0 2px 17px 3px rgba(34, 42, 69, 0.07);
  max-width: 100vw;
  pointer-events: none;

  &.plugin-notification--visible {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}
</style>
