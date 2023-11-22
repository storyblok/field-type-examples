import { numberFromString } from './utils'

export const pluginName =
  import.meta.env.VITE_PLUGIN_NAME || 'picker-starter-plugin'

export const throttleMs =
  numberFromString(import.meta.env.VITE_THROTTLE_MS) || 300

export const defaultPerPage =
  numberFromString(import.meta.env.VITE_DEFAULT_PER_PAGE) || 12
