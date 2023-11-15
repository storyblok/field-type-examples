import { List } from './index.ts'
import { ListItem } from './ListItem/index.ts'
import { Avatar } from '../Avatar'
import { SbButton } from '@storyblok/design-system'
import { defineComponent } from 'vue'

export default {
  title: 'General/List',
  component: List,
  argTypes: {},
}

const CopyButton = defineComponent({
  components: {
    SbButton,
  },
  template: `
      <SbButton
          has-icon-only
          icon="copy"
          variant="tertiary"
          size="small"
          style="border: none"
      />
`,
})

const Subtitle = defineComponent({
  template: `
      <div
          style="flex: 1; font-weight: bold; font-size: 1.3rem"
      >
        <slot />
      </div>
  `,
})

const Template = (args) =>
  defineComponent({
    components: {
      List,
      ListItem,
      Subtitle,
      CopyButton,
      Avatar,
    },
    setup() {
      return { args }
    },
    template: `
      <List>
        <ListItem style="padding: 5px">
          <Avatar label="Αlpha"/>
          <Subtitle>Alpha</Subtitle>
          <CopyButton/>
        </ListItem>
        <ListItem style="padding: 5px">
          <Avatar label="Βeta"/>
          <Subtitle>Beta</Subtitle>
          <CopyButton/>
        </ListItem>
        <ListItem style="padding: 5px">
          <Avatar label="Γ"/>
          <Subtitle>Gamma</Subtitle>
          <CopyButton/>
        </ListItem>
        <ListItem style="padding: 5px">
          <Avatar label="Δ"/>
          <Subtitle>Alpha</Subtitle>
          <CopyButton/>
        </ListItem>
      </List>
    `,
  })

export const Basic = Template.bind({})
