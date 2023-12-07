import { Component } from 'vue'
import { OptionsParams, PickerPluginParams, TabItem } from './types'

export type PickerConfig = {
  title?: string
  icon?: Component
  options: PickerConfigOptions
  tabs: TabItem[]
}

export type PickerConfigOptions = {
  example: OptionsParams
  validate: () => ValidationResult
}

export type ValidationResult = {
  isValid: boolean
  error: string | undefined
}

export type PickerConfigFn = (options: OptionsParams) => PickerConfig

export type PickerBuilderFn = (options: OptionsParams) => PickerPluginParams

export const defineConfig =
  (fn: PickerConfigFn): PickerBuilderFn =>
  (options: OptionsParams): PickerPluginParams => {
    const config: PickerConfig = fn(options)

    return {
      title: config.title,
      icon: config.icon,
      makeService: () => {
        const { options } = config

        const validation = options.validate()

        if (!validation.isValid) {
          return {
            exampleOptions: options.example,
            error: validation.error,
          }
        }

        return {
          exampleOptions: options.example,
          value: { tabs: config.tabs },
        }
      },
    }
  }
