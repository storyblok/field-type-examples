import { ItemPicker } from './index.ts'
import { createBasket } from './'
import { mock } from '@storyblok/mock-platform'

export default {
  component: ItemPicker,
  title: 'Screens/ItemPicker',
  argTypes: {
    item: {
      table: {
        category: 'Object',
      },
    },
    value: {
      table: {
        category: 'Boolean',
      },
    },
    disabled: {
      table: {
        category: 'Boolean',
      },
    },
  },
}

const Template = (args) => ({
  components: { ItemPicker },
  setup() {
    return { args }
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {
    defaultBasket() {
      return createBasket(
        this.items,
        (getItems) => (this.items = getItems(this.items)),
      )
    },
    defaultItemService() {
      return mock({}).itemServices[0]
    },
  },
  template:
    '<ItemPicker  v-bind="args" :basket="defaultBasket" :item-service="defaultItemService" />',
})

export const Basic = Template.bind({})
Basic.args = {}

export const LimitReached = Template.bind({})
LimitReached.args = {
  isLimitReached: true,
}
