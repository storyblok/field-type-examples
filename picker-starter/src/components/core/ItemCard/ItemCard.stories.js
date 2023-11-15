import { ItemCard } from './index'

export default {
  component: ItemCard,
  title: 'Item/ItemCard',
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
  components: { ItemCard },
  setup() {
    return { args }
  },
  template: '<ItemCard v-bind="args" />',
})

const item = {
  image: undefined,
  name: 'Default Card',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
}
const itemWithoutDescription = {
  image: undefined,
  name: 'Default Card',
}

export const Basic = Template.bind({})
Basic.args = {
  item,
  value: false,
  disabled: false,
}

export const WithoutDescription = Template.bind({})
WithoutDescription.args = {
  item: itemWithoutDescription,
  value: false,
  disabled: false,
}

export const Checked = Template.bind({})
Checked.args = {
  item,
  value: true,
  disabled: false,
}

export const WithImage = Template.bind({})
WithImage.args = {
  item: { ...item, image: '/demo.jpg' },
  value: true,
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  item,
  value: true,
  disabled: true,
}
