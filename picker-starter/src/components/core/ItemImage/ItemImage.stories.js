import { ItemImage } from './index'

export default {
  component: ItemImage,
  title: 'General/ItemImage',
  argTypes: {
    imageSrc: {
      type: 'string',
    },
    label: {
      type: 'string',
      defaultValue: '',
    },
  },
}

const Template = (args) => ({
  components: { ItemImage },
  setup() {
    return { args }
  },
  template: '<ItemImage v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {}

export const Image = Template.bind({})
Image.args = {
  imageSrc: '/demo.jpg',
}

export const Label = Template.bind({})
Label.args = {
  label: 'Storybook Design System',
}
