import { loadPlugin } from '@/lib/loadPlugin'
import SliderPlugin from '@/components/SliderPlugin.vue'

loadPlugin(
  'storyblok-slider-preview',
  {
    value: 0,
  },
  SliderPlugin,
)
