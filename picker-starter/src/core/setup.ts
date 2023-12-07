import { Component } from 'vue'
import { OptionsParams, TabItem } from './types'

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

export const defineConfig =
  (fn: PickerConfigFn): PickerConfigFn =>
  (options: OptionsParams) =>
    fn(options)
