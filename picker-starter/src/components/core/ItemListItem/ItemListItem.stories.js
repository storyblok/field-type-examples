import { ItemListItem } from './index.ts'

export default {
  component: ItemListItem,
  title: 'Item/ItemListItem',
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
  components: { ItemListItem },
  setup() {
    return { args }
  },
  template: '<ItemListItem v-bind="args"  />',
})

const item = {
  image: undefined,
  name: 'Default Card',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
}

export const Basic = Template.bind({})
Basic.args = {
  item,
}

export const Selected = Template.bind({})
Selected.args = {
  item,
  value: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  item,
  value: true,
  disabled: true,
}
