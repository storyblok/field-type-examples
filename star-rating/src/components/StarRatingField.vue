<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFieldPlugin } from '../useFieldPlugin'
import StarIcon from './StarIcon.vue'
import AmountInvalidAlert from './AmountInvalidAlert.vue'

const plugin = useFieldPlugin()

const model = ref(0);
const hoverValue = ref(0)
const hoverActive = ref(false)
const numberOfStars = ref(5)
const isAmountInvalid = ref(false)

if (plugin.data.options.amount) {
  const amount = parseInt(plugin.data.options.amount, 10);

  if (!isNaN(amount) && amount > 1) {
    numberOfStars.value = amount;
    isAmountInvalid.value = false;
  } else {
    isAmountInvalid.value = true;
  }
}

const getStarValue = (index: number) => {
  const activeValue: number = hoverActive.value ? hoverValue.value : model.value;

  let starClass = ['rate__star'];

  if (activeValue >= index) {
    starClass.push('rate__star--full');
  } else if (activeValue >= index - 0.5) {
    starClass.push('rate__star--half');
  }

  return starClass;
}

const onMouseLeave = () => {
  hoverValue.value = 0;
  hoverActive.value = false;
};

const onClick = (index: number) => {
  const newValue = index > 0 ? index : 0;
  model.value = newValue;
};

const onHover = (index: number) => {
  hoverValue.value = index;
  hoverActive.value = true;
};

watch(model, (newValue) => {
  plugin.actions.setContent(newValue)
})
</script>

<template>
  <AmountInvalidAlert v-if="isAmountInvalid" />
  <ol v-else @mouseleave="onMouseLeave" role="radiogroup" class="rate">
    <li :class="getStarValue(index)" v-for="index in numberOfStars" :key="index">
      <div role="radio" :aria-checked="model > index" :aria-posinset="index + 1" :aria-setsize="numberOfStars"
        tabindex="0">
        <StarIcon class="rate__star--first" @click="onClick(index - 0.5)" @mousemove="onHover(index - 0.5)" />
        <StarIcon class="rate__star--second" @click="onClick(index)" @mousemove="onHover(index)" />
      </div>
    </li>
  </ol>
</template>

<style scoped>
.rate {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
  font-weight: 400;
  font-style: normal;
  outline: none
}

.rate__star {
  margin: 0;
  padding: 0;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  color: #b1b5be;
  cursor: pointer;
  line-height: 1.5;
  -webkit-transition: all .2s;
  transition: all .2s
}

.rate__star:not(:last-child) {
  margin-right: 8px
}

.rate__star>div:focus,
.rate__star>div:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1)
}

.rate__star--first,
.rate__star--second {
  color: inherit;
  -webkit-transition: all .2s;
  transition: all .2s
}

.rate__star:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1)
}

.rate__star--first {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  opacity: 0
}

.rate__star--half .rate__star--first,
.rate__star--half .rate__star--second {
  opacity: 1
}

.rate__star--full .rate__star--second,
.rate__star--full:hover .rate__star--second,
.rate__star--half .rate__star--first,
.rate__star--half:hover .rate__star--first {
  color: #ffac00
}
</style>