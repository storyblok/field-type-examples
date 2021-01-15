# Material Icon Selector Field-Type

This field-type allows users to choose icons with each of the available icon styles from [Material Icons](https://material.io/icons/).

Name | Description | Author
------------ | ------------- | -------------
Material Icon Selector | Allows users to select any material icon | [Riley MacIsaac](https://github.com/rileymacisaac)


## Usage

Select the desired style, and search/filter for your desired icon. 

Returns an object with the class and icon name:
```
{
  "plugin": "material-icon-selector",
  "icon": "<icon name>", // string
  "class": "<icon class based on selected style>", // string
  ...
}
```

## Output
To ouput this, load the stylesheet in the `<head>` of your site, for example, if you want to include all of the icon styles you would use this link from Google:
`https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Two+Tone|Material+Icons+Sharp`

Example of a decorative icon:
```
<span class="material-icons" aria-hidden="true">
    book
</span>
```

Example of a non-decorative icon:
```
<span class="material-icons" role="img" aria-label="<descriptive label here>">
    book
</span>
```
