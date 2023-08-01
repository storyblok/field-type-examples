import { FunctionComponent, useEffect, useState } from 'react'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { useFieldPlugin } from '../useFieldPlugin'

const Tag: FunctionComponent = () => {
  const { data, actions } = useFieldPlugin()

  const [initialValue, setInitialValue] = useState<string[]>([])

  useEffect(() => {
    setInitialValue(parseJsonValue(data.options.initialValue))
  }, [data.options.initialValue])

  useEffect(() => {
    actions.setContent(initialValue)
  }, [initialValue])

  return (
    <Autocomplete
      multiple
      options={[]}
      value={initialValue}
      onChange={(e, newValue: string[]) => setInitialValue(newValue)}
      freeSolo
      disableClearable
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <Chip
            label={option}
            color="primary"
            variant="filled"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          variant="outlined"
          placeholder={data.options.placeholder}
          {...params}
        />
      )}
    />
  )
}

const parseJsonValue = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr)
  } catch (err) {
    return []
  }
}

export default Tag
