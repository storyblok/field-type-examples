import { ModalContainer } from './index'
import { ModalHeader } from '../ModalHeader'
import { Skeleton } from '../Skeleton'
import { FieldModal } from '../storybook/FieldModal'
import { StoryblokIcon } from '../icons'
import { EmptyScreen } from '../EmptyScreen'
import { defineComponent } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Layout/ModalContainer',
  component: ModalContainer,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'text'],
    },
  },
}

const Template = (args) =>
  defineComponent({
    components: {
      ModalContainer,
      ModalHeader,
      Skeleton,
      FieldModal,
      StoryblokIcon,
      EmptyScreen,
    },
    setup() {
      return { args }
    },
    template: `
      <FieldModal>
      <ModalContainer v-bind="args">
        <EmptyScreen />
        <template #header>
          <ModalHeader
              title="Hello"
          >
            <template #icon>
              <StoryblokIcon/>
            </template>
          </ModalHeader>
        </template>
        <template #main>
          <Skeleton style="height: 500px"/>
        </template>
      </ModalContainer>
      </FieldModal>
      <script>
      import EmptyScreen from "./EmptyScreen";
      export default {
        components: {EmptyScreen}
      }
      </script>`,
  })

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Basic.args = {}
