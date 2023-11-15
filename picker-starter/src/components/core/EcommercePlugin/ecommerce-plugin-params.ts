import { ECommerceService } from '@storyblok/e-commerce'
import { ValidationResult } from './validation-result'
import { Component } from 'vue'

export type EcommerceServiceValidationResult =
  | {
      exampleOptions: Record<string, string>
      value: undefined
      error: string
    }
  | {
      exampleOptions: Record<string, string>
      value: ECommerceService
      error: undefined
    }

export type EcommercePluginParams = {
  title?: string
  icon?: Component
  makeECommerceService: (props: unknown) => EcommerceServiceValidationResult
}

export type ValidateOptions<Options extends Record<string, unknown>> = (
  options: unknown,
) => ValidationResult<Options>
