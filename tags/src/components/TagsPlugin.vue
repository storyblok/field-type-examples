<template>
  <div class="tags-container">
    <vue-tags-input
      :value="inputValue"
      :tags="tags"
      :placeholder="options.placeholder || ''"
      @input="handleInputValueChange"
      @tags-changed="handleValueChange"
    />
  </div>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  components: {
    VueTagsInput,
  },
  props: {
    options: {
      type: Object,
      default: undefined,
    },
    setValue: {
      type: Function,
    },
    value: {
      type: Object,
    },
  },
  data() {
    return {
      inputValue: '',
    }
  },
  computed: {
    tags() {
      return this.value.value?.map((text) => ({ text }))
    },
  },
  methods: {
    handleInputValueChange(inputValue) {
      console.log('input', inputValue)
      console.log('tags', this.value.value)
      this.inputValue = inputValue
    },
    handleValueChange(tags) {
      console.log('new value', tags)
      this.setValue({ value: tags.map((tag) => tag.text) })
    },
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 62.5%;
}

.tags-container {
  padding: 2px;
}

.vue-tags-input .ti-input:hover {
  border-color: #00b3b0;
}

.vue-tags-input.ti-focus .ti-input {
  border-radius: 5px;
  border-color: #00b3b0;
  box-shadow: 0 0 0 3px #d9f4f3;
  outline: none;
}

.vue-tags-input .ti-input {
  border: 1px solid #dfe3e8;
  width: 100%;
  color: #1b243f;
  font-size: 1.4rem;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  padding: 13.5px 17px;
  font-family: 'Roboto', sans-serif;
}

.vue-tags-input .ti-tag.ti-tag.ti-deletion-mark {
  background-color: #ff6159;
}

.vue-tags-input .ti-tag {
  background-color: #00b3b0;
  padding: 3px 10px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: 3px 10px;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 5px;
}
</style>
