<template>
  <label
    class="plugin-category-picker-list-item"
    tabindex="0"
  >
    <input
      :aria-checked="!!value"
      :disabled="disabled"
      type="checkbox"
      @change="handleClick"
    />
    <span
      class="plugin-category-picker-list-item__label"
      :class="{ checked: value }"
    >
      <span class="plugin-checkbox">
        <span class="plugin-checkbox__selectable">
          <SbIcon
            name="check"
            class="plugin-checkbox__icon"
            size="small"
          />
        </span>
      </span>

      <Avatar
        :image-src="item.image"
        :label="item.name"
      />

      <span class="plugin-category-picker-list-item__text">
        <span class="plugin-category-picker-list-item__name">
          {{ item.name }}
        </span>
        <span
          v-if="item.description"
          class="plugin-category-picker-list-item__description"
        >
          {{ item.description }}
        </span>
      </span>
    </span>
  </label>
</template>

<script setup>
import { Avatar } from '@/components'
import { SbIcon } from '@storyblok/design-system'

//TODO: check accessibility on the checkboxes
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  value: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.disabled) {
    return
  }
  emit('click')
}
</script>

<style scoped lang="scss">
@import '@/components/styles';

.plugin-list-item {
  padding: 0;
}

.plugin-checkbox {
  padding: 5px;
  background-color: var(--sb-color-neutral-white);
  border-radius: 5px;

  .plugin-checkbox__selectable {
    color: white;
    border-radius: 3px;
    background-color: transparent;
    @include transition(background-color);

    .plugin-checkbox__icon {
      border-radius: 3px;
      border: 1px solid var(--sb-color-secondary-100);
      @include transition(background-color, border-width, border-color);
    }
  }
}

input[type='checkbox'] {
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;

  &:disabled {
    + .plugin-category-picker-list-item__label {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: transparent;

      .plugin-checkbox {
        background-color: #f5f5f5;
        border: 1px solid var(--sb-color-secondary-100);
      }
    }
  }
}

.plugin-category-picker-list-item {
  border-bottom: 1px solid var(--sb-color-secondary-100);
  position: relative;
  @include transition(background-color);
  flex: 1;
  width: 100%;

  &:focus {
    outline: none;
    background-color: #f7f8f9;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__name {
    @include typography-title;
  }

  &__description {
    @include typography-description;
    @include max-lines(1);
    margin: 0;
  }

  &__label {
    padding: 12px 15px;
    display: flex;
    align-items: center;
    flex: 1;
    gap: 10px;
    cursor: pointer;

    &.checked {
      .plugin-checkbox__selectable {
        border: none;

        .plugin-checkbox__icon {
          background-color: var(--sb-color-primary-700);
          border-color: transparent;
        }
      }
    }

    &:hover {
      background-color: #f7f8f9;
    }
  }
}

.plugin-category-picker-list-item__label {
  @include transition(opacity);
}
</style>
