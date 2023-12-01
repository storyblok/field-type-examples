<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div class="plugin-empty-container">
      <component
        :is="icon"
        v-if="icon"
        class="plugin-empty-layout__icon"
      />
      <h3
        v-if="title"
        class="plugin-empty-layout__title"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="plugin-empty-layout__text"
      >
        {{ description }}
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EmptyScreen',
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    description: {
      type: String,
      required: false,
      default: undefined,
    },
    icon: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles.scss';

.plugin-empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  gap: 10px;
  justify-content: center;
  flex: 1 1;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
}

.plugin-empty-layout__icon {
  width: 110px;
  margin: 16px 0 32px 0;
}

.plugin-empty-layout__title {
  font-size: 2.1rem;
}

.plugin-empty-layout__text {
  max-width: 390px;
  margin: 0 0 16px;
  color: #8d919f;
  font-size: 1.6rem;
}
</style>
