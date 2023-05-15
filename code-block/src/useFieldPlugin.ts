import { createFieldPlugin, FieldPluginResponse } from '@storyblok/field-plugin'
import { useEffect, useState } from 'react'

type UseFieldPlugin = () => FieldPluginResponse

export const useFieldPlugin: UseFieldPlugin = () => {
  const [state, setState] = useState<FieldPluginResponse>({
    type: 'loading',
  })

  useEffect(() => {
    return createFieldPlugin(setState)
  }, [])

  return state
}
