<template>
  <label :class="`plugin-category-picker-list-item`">
    <input
      :aria-checked="!!value"
      :disabled="disabled"
      type="checkbox"
      @change="handleClick"
    />
    <span
      :class="`plugin-category-picker-list-item__label ${
        value ? 'plugin-category-picker-list-item__label--checked' : ''
      }`"
    >
      <span class="plugin-checkbox">
        <SbIcon
          v-if="value"
          name="check-mark"
          class="plugin-checkbox__icon"
          size="small"
        />
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
<script>
import { Avatar } from '../Avatar/index.ts'
import { SbIcon } from '@storyblok/design-system'

//TODO: check accessibility on the checkboxes
export default {
  name: 'ItemListItem',
  components: {
    Avatar,
    SbIcon,
  },
  props: {
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
  },
  emits: ['click'],
  methods: {
    handleClick() {
      if (this.disabled) {
        return
      }
      this.$emit('click')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles';

.plugin-list-item {
  padding: 0;
}

.plugin-checkbox {
  min-width: 16px;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: white;
  border: 1px solid #dfe3e8;
  @include transition(background-color);

  &__icon {
    color: white;
    border-radius: 3px;
    border: 1px solid #dfe3e8;
    @include transition(background-color, border-width, border-color);
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
        border: 1px solid #dfe3e8;
      }
    }
  }

  &:focus {
    + .plugin-category-picker-list-item__label {
      border: 2px solid #d9f4f3;
    }
  }
}

.plugin-category-picker-list-item {
  border-bottom: 1px solid #dfe3e8;
  position: relative;
  @include transition(background-color);
  flex: 1;

  label {
    width: 100%;
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
    border: 2px solid transparent;
    padding: 15px 10px 10px 15px;
    display: flex;
    align-items: center;
    flex: 1;
    gap: 10px;
    cursor: pointer;

    &--checked {
      background-color: #f7f8f9;

      .plugin-checkbox {
        border: none;

        &__icon {
          background-color: #00b3b0;
          border-width: 0;
          border-color: transparent;
        }
      }

      &:hover {
        background-color: #e7eaee;
        cursor: pointer;
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
