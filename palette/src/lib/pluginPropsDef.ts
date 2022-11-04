import { RecordPropsDefinition } from 'vue/types/options'
import { WrapperPluginProps } from '@/lib/types'

export const pluginPropsDef: RecordPropsDefinition<WrapperPluginProps> = {
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  setModalOpen: {
    type: Function,
    required: true,
  },
  /**
   * The options is a Record<String, String | undefined>
   */
  options: {
    type: Object,
    required: true,
  },
  setValue: {
    type: Function,
    required: true,
  },
  value: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  spaceId: {
    type: Number,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
}
