<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFieldPlugin } from '../useFieldPlugin'

const plugin = useFieldPlugin()

const model = ref(0);
const hoverValue = ref(0)
const hoverActive = ref(false)
const numberOfStars = ref(5)

if (plugin.data.options.numberOfStars) {
  numberOfStars.value = parseInt(plugin.data.options.numberOfStars, 10);
}

const getStarValue = (index: number) => {
  const activeValue: number = hoverActive.value ? hoverValue.value : model.value;

  let starClass = ['rate__star'];

  if (activeValue >= index) {
    starClass.push('rate__star--full');
  }
  
  else if (activeValue >= index - 0.5) {
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
  <ul @mouseleave="onMouseLeave" role="radiogroup" class="rate">
    <li :class="getStarValue(index)" v-for="index in numberOfStars" :key="index">
      <div role="radio" :aria-checked="model > index ? 'true' : 'false'" :aria-posinset="index + 1" :aria-setsize="numberOfStars"
        tabindex="0">
        <div @click="onClick(index - 0.5)" @mousemove="onHover(index - 0.5)" class="rate__star--first">
          <svg viewBox="64 64 896 896" class="rate__icon" width="1em" height="1em" fill="currentColor" aria-hidden="true"
            focusable="false">
            <path
              d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
            </path>
          </svg>
        </div>
        <div @click="onClick(index)" @mousemove="onHover(index)" class="rate__star--second">
          <svg viewBox="64 64 896 896" class="rate__icon" width="1em" height="1em" fill="currentColor" aria-hidden="true"
            focusable="false">
            <path
              d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
            </path>
          </svg>
        </div>
      </div>
    </li>
  </ul>
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

.rate__icon {
  max-width: none;
  display: block;
  color: inherit;
  display: inline-block;
  overflow: hidden;
  line-height: 1
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

.rate__star--checked {
  color: #ffac00
}

.rate__star--focused,
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