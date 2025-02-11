import { FunctionComponent, useEffect, useState } from 'react'
import { useFieldPlugin } from '../useFieldPlugin'
import {
  Autocomplete,
  AutocompleteGetTagProps,
  Chip,
  TextField,
} from '@mui/material'

const Tag: FunctionComponent = () => {
  const { data, actions } = useFieldPlugin()

  const contentValue = (data.content as { value: string[] })?.value

  const [initialValue, setInitialValue] = useState<string[]>(
    Array.isArray(contentValue)
      ? contentValue
      : parseJsonValue(data.options.initialValue),
  )

  useEffect(() => {
    actions.setContent({
      value: initialValue,
      plugin: "storyblok-tags",
    })
  }, [initialValue])

  return (
    <Autocomplete
      multiple
      options={[]}
      value={initialValue}
      onChange={(e, newValue: string[]) => setInitialValue(newValue)}
      freeSolo
      disableClearable
      renderTags={renderTagItem}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          placeholder={data.options.placeholder}
          sx={{ background: '#fff' }}
          {...params}
        />
      )}
    />
  )
}

const renderTagItem = (
  value: readonly string[],
  getTagProps: AutocompleteGetTagProps,
) =>
  value.map((option: string, index: number) => (
    // eslint-disable-next-line react/jsx-key
    <Chip
      label={option}
      color="default"
      variant="filled"
      {...getTagProps({ index })}
    />
  ))

const parseJsonValue = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr)
  } catch (err) {
    return []
  }
}

export default Tag
