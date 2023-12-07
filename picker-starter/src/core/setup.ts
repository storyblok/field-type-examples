import { Component } from 'vue'
import { OptionsParams, PickerPluginParams, TabItem } from './types'

export type PickerConfig = {
  title?: string
  icon?: Component
  options?: PickerConfigOptions
  tabs: TabItem[]
}

export type PickerConfigOptions = {
  example?: OptionsParams
  validate: () => ValidationResult
}

export type ValidationResult = {
  isValid: boolean
  error: string | undefined
}

export type PickerConfigFn = (optionsParams: OptionsParams) => PickerConfig

export type PickerBuilderFn = (
  optionsParams: OptionsParams,
) => PickerPluginParams

export const defineConfig =
  (fn: PickerConfigFn): PickerBuilderFn =>
  (optionsParams: OptionsParams): PickerPluginParams => {
    const { title, icon, options, tabs } = fn(optionsParams)

    return {
      title,
      icon,
      makeService: () => {
        const validation = options?.validate()

        if (validation?.isValid === false) {
          return {
            exampleOptions: options?.example,
            error: validation.error,
          }
        }

        return {
          exampleOptions: options?.example,
          value: { tabs },
        }
      },
    }
  }
