import {loadPlugin} from "@/lib/loadPlugin";
import SliderPlugin from '@/components/TagsPlugin.vue'

loadPlugin({
    name: 'storyblok-tags',
    initialValue: {
        value: [],
    },
    Component: SliderPlugin,
})
