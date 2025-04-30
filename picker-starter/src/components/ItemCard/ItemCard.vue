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
        <div class="plugin-item-card__footer-name">
          {{ item.name }}
        </div>
        <div
          v-if="item.description"
          class="plugin-item-card__footer-description"
        >
          {{ item.description }}
        </div>
      </CardFooter>
    </Card>
  </label>
</template>

<script>
import { Card, CardContent, CardFooter } from '@/components'
import ItemImage from '../ItemImage/ItemImage.vue'
import { SbIcon } from '@storyblok/design-system'

export default {
  name: 'ItemCard',
  components: {
    ItemImage,
    CardContent,
    CardFooter,
    Card,
    SbIcon,
  },
  props: {
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

.plugin-item-card {
  border: 1px solid transparent;
  @include transition(background-color, border-color, box-shadow, opacity);
}

.plugin-checkbox {
  color: white;
  border-radius: 3px;
  background-color: transparent;
  @include transition(background-color);
}

.plugin-checkbox__container {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
}

.plugin-checkbox__icon {
  border-radius: 3px;
  border: 1px solid #dfe3e8;
  @include transition(background-color, border-width, border-color);
}

.plugin-item-card__content {
  background-color: #eff1f3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-item-card__footer-name {
  @include typography-title;
}

.plugin-item-card__footer-description {
  @include typography-description;
  @include max-lines(3);
}

.plugin-item-card--checked {
  background-color: #f9f9f9;
  border-color: #00b3b0;

  .plugin-checkbox__icon {
    background-color: #00b3b0;
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
      background-color: rgba(0, 0, 0, 0.03);
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
      box-shadow: 0 0 0 3px #d9f4f3;
    }
  }
}
</style>
