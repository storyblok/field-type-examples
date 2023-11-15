import { WrapperPluginProps } from './WrapperPluginProps'
import { ComponentObjectPropsOptions, PropType } from 'vue'
export const pluginPropsDef: ComponentObjectPropsOptions<WrapperPluginProps> = {
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  setModalOpen: {
    type: Function as PropType<(isModal: boolean) => void>,
    required: true,
  },
  /**
   * The options is a Record<String, String | undefined>
   */
  unvalidatedOptions: {
    type: Object,
    required: true,
  },
  setValue: {
    type: Function as PropType<(value: unknown) => void>,
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
