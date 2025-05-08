import { ref } from 'vue'
import { NotificationError } from '@/core'

const errorNotification = ref<NotificationError>()

export const useErrorNotification = () => {
  const setErrorNotification = (err?: NotificationError) => {
    errorNotification.value = err
  }

  return {
    errorNotification,
    setErrorNotification,
  }
}
