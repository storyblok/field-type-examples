import { Grid } from './index.ts'
import { GridItem } from './GridItem/index.ts'
import { SkeletonCard } from '../SkeletonCard/index.ts'
import { defineComponent } from 'vue'

export default {
  title: 'General/Grid',
  component: Grid,
  argTypes: {},
}

const Template = (args) =>
  defineComponent({
    components: {
      Grid,
      GridItem,
      SkeletonCard,
    },
    setup() {
      return { args }
    },
    template: `
      <Grid>
      <GridItem>
        <SkeletonCard />
      </GridItem>
      <GridItem>
        <SkeletonCard />
      </GridItem>
      <GridItem>
        <SkeletonCard />
      </GridItem>
      </Grid>
    `,
  })

export const Basic = Template.bind({})
