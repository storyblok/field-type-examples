import { useEffect, useState } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { TextField, Autocomplete, styled, Box, Paper } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))
const StyledPopper = styled(Box)(({ theme }) => ({
  position: 'relative !important',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  // maxHeight: 'unset !important',
  marginTop: theme.spacing(2),
  width: 'unset !important',
  maxHeight: 300,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}))
const StyledPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}))
const StyledListBox = styled(Box)(() => ({
  maxHeight: 'unset !important',
}))
const FieldPlugin = () => {
  const {
    data,
    actions: { setContent },
  } = useFieldPlugin()

  const [folders, setFolders] = useState([])
  const [selectOpen, setSelectOpen] = useState(false)

  // Intial content of the plugin
  const isArrayOfObjects = (value) =>
    Array.isArray(value) && value.every((it) => typeof it === 'object')
  const content = isArrayOfObjects(data.content) ? data.content : []
  // Extracting starts_with from options
  const startsWith = data.options.starts_with ?? ''
  // Using space token
  const token = data.token

  const maximum = Number(data.options.maximum)

  useEffect(() => {
    getFolders(token, startsWith).then(setFolders)
  }, [token, startsWith])

  const foldersInContent = folders.filter((folder) =>
    content.some((c) => c.id === folder.id),
  )

  return (
    <StyledAutocomplete
      multiple
      value={foldersInContent}
      options={folders}
      getOptionLabel={(folder) => folder.name}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Select Folders"
        />
      )}
      componentsProps={{
        popper: {
          sx: {
            display: selectOpen ? undefined : 'none',
          },
        },
      }}
      PopperComponent={StyledPopper}
      PaperComponent={StyledPaper}
      ListboxComponent={StyledListBox}
      noOptionsText="No folders matches the filter"
      open={selectOpen}
      onOpen={() => setSelectOpen(true)}
      onClose={() => setSelectOpen(false)}
      onChange={(event, value) => setContent(value)}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          divider
          key={option.id}
          value={option}
          sx={{ justifyContent: 'space-between' }}
          disabled={!!maximum && content.length >= maximum && !selected}
        >
          <Checkbox checked={selected} />
          <ListItemText
            primary={option.name}
            secondary={option.slug}
          />
        </MenuItem>
      )}
    />
  )
}
const getFolders = async (token, startsWith) => {
  // Get folders and filter according to starts_with
  // Fetch all links
  let response = await fetch(
    `https://api.storyblok.com/v2/cdn/links/?token=${token}&starts_with=${startsWith}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  const allLinks = await response.json()
  // Map Folders
  return Object.values(allLinks.links)
    .filter((l) => l.is_folder)
    .map((f) =>
      // Storing id, name, slug, uuid
      ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        uuid: f.uuid,
      }),
    )
}
export default FieldPlugin
