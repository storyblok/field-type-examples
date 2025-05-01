<template>
  <label>
    <input
      :aria-checked="!!value"
      :disabled="disabled"
      type="checkbox"
      @change="handleClick"
    />
    <Card
      class="plugin-item-card"
      :class="{
        'plugin-item-card--checked': value,
      }"
    >
      <CardContent class="plugin-item-card__content">
        <!--        TODO Extract checkbox into a new component -->
        <div class="plugin-checkbox__container">
          <div class="plugin-checkbox">
            <div class="plugin-checkbox__icon">
              <SbIcon
                name="check"
                size="small"
              />
            </div>
          </div>
        </div>
        <ItemImage
          :image-src="item.image"
          :label="item.name"
        />
      </CardContent>
      <CardFooter>
        <p class="plugin-item-card__footer-name">
          {{ item.name }}
        </p>
        <p
          v-if="item.description"
          class="plugin-item-card__footer-description"
        >
          {{ item.description }}
        </p>
      </CardFooter>
    </Card>
  </label>
</template>

<script setup>
import { Card, CardContent, CardFooter, ItemImage } from '@/components'
import { SbIcon } from '@storyblok/design-system'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  value: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
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

.plugin-item-card {
  gap: 10px;
  border: 2px solid transparent;
  @include transition(background-color, border-color, box-shadow, opacity);
}

.plugin-checkbox {
  color: var(--sb-color-neutral-white);
  border-radius: 3px;
  background-color: transparent;
  @include transition(background-color);
}

.plugin-checkbox__container {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  background-color: var(--sb-color-neutral-white);
  border-radius: 5px;
}

.plugin-checkbox__icon {
  border-radius: 3px;
  border: 1px solid var(--sb-color-secondary-100);
  @include transition(background-color, border-width, border-color);
}

.plugin-item-card__content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-item-card__footer-name,
.plugin-item-card__footer-description {
  margin: 0;
}

.plugin-item-card__footer-name {
  @include typography-title;
}

.plugin-item-card__footer-description {
  @include typography-description;
  @include max-lines(3);
}

.plugin-item-card--checked {
  background-color: var(--sb-color-base-50);
  border-color: var(--sb-color-primary-700);

  .plugin-checkbox__icon {
    background-color: var(--sb-color-primary-700);
    border-color: transparent;
  }
}

input[type='checkbox'] {
  width: 0;
  height: 0;
  position: absolute;

  &:hover {
    + .plugin-item-card {
      cursor: pointer;
      background-color: var(--sb-color-base-50);
    }
  }

  &:disabled {
    + .plugin-item-card {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: inherit;
    }
  }

  &:focus {
    + .plugin-item-card {
      background-color: var(--sb-color-base-50);
    }
  }
}
</style>
