import { ModalHeader } from './index'
import { Skeleton } from '../Skeleton'
import { StoryblokIcon } from '../icons'
import { FieldModal } from '../storybook/FieldModal'
import { SbButton } from '@storyblok/design-system'
import { defineComponent } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Layout/ModalHeader',
  component: ModalHeader,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
}

const Template = (args) =>
  defineComponent({
    components: {
      ModalHeader,
      Skeleton,
      FieldModal,
    },
    setup() {
      return { args }
    },
    template: `
      <FieldModal>
        <ModalHeader v-bind="args" />
      </FieldModal>
    `,
  })

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Basic.args = {
  title: 'Title',
}

const IconTemplate = (args) =>
  defineComponent({
    components: {
      ModalHeader,
      Skeleton,
      StoryblokIcon,
      FieldModal,
    },
    setup() {
      return { args }
    },
    template: `
      <FieldModal>
      <ModalHeader v-bind="args">
        <template #icon>
          <StoryblokIcon />
        </template>
      </ModalHeader>
      </FieldModal>
    `,
  })

export const Icon = IconTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Icon.args = {
  title: 'Title',
}

const ActionsTemplate = (args) =>
  defineComponent({
    components: {
      ModalHeader,
      Skeleton,
      FieldModal,
      SbButton,
    },
    setup() {
      return { args }
    },
    template: `
      <FieldModal>
      <ModalHeader v-bind="args">
        <template #actions>
          <SbButton label="Done" size="small" />
        </template>
      </ModalHeader>
      </FieldModal>
    `,
  })

export const Actions = ActionsTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Actions.args = {
  title: 'Title',
}

const ActionsAndIconTemplate = (args) =>
  defineComponent({
    components: {
      ModalHeader,
      Skeleton,
      FieldModal,
      SbButton,
      StoryblokIcon,
    },
    setup() {
      return { args }
    },
    template: `
      <FieldModal>
        <ModalHeader v-bind="args">
          <template #icon>
            <StoryblokIcon />
          </template>
          <template #actions>
            <SbButton label="Done" size="small" />
          </template>
        </ModalHeader>
      </FieldModal>
      `,
  })

export const ActionsAndIcon = ActionsAndIconTemplate.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
ActionsAndIcon.args = {
  title: 'Title',
}
