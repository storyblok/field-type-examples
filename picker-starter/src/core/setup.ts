import { Component } from 'vue'
import { OptionsParams, PickerPluginParams, TabItem } from './types'

export type PickerConfig = {
  title?: string
  icon?: Component
  validateOptions?: () => ValidationResult
  tabs: TabItem[]
}

export type ValidationResult = {
  isValid: boolean
  error?: string
}

export type PickerConfigFn = (optionsParams: OptionsParams) => PickerConfig

export type PickerBuilderFn = (
  optionsParams: OptionsParams,
) => PickerPluginParams

export const defineConfig =
  (fn: PickerConfigFn): PickerBuilderFn =>
  (optionsParams: OptionsParams): PickerPluginParams => {
    const { title, icon, tabs, validateOptions } = fn(optionsParams)

    return {
      title,
      icon,
      makeService: () => {
        const validation = validateOptions?.()

        if (validation?.isValid === false) {
          return {
            error: validation.error || 'Unknown error',
          }
        }

        return {
          value: { tabs },
        }
      },
    }
  }
