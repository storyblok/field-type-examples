<p style="text-align: center">
  <a href="https://www.storyblok.com/" rel="noopener">
 <img width=150px src="https://a.storyblok.com/f/51376/3856x824/fea44d52a9/colored-full.png" alt="Storyblok" style="display:inline-block;margin:20px;"></a>
</p>

<h1>
<img src="assets/icon.svg" height="26px">
Palette Field Type
</h1>

A custom field-type for Storyblok that allow users to select a color from a palette.

![demo.gif](docs/demo.gif)

## How to use

To add this field type to a Storyblok space, you need to

1. Create a new field type in the Storyblok app.
2. Open `src/entries/main.ts` and change the `pluginName` argument from `'storyblok-palette'` to the name of your
   plugin.
3. Run

```bash
# install dependencies
yarn install

# build the plugin
yarn build
```

4. Copy the contents of `dist/main.js` into the field type editor.
5. Save
6. Publish

### Import plugin into Storyblok

Ensure that the `pluginName` property in `src/config.ts` equals that of your plugin name in the storyblok application.

Copy the contents of the `dist/export.js` file into the [plugin section](https://app.storyblok.com/#!/me/plugins) of
Storyblok.

> **TIP**: On MacOs, run `yarn mac-build`. This will copy the text content of the `export.js` to your clipboard.

# App Description

Select a color from a customizable set with the Palette field plugin. The palette is ideal for settings colors for
buttons, headers, and backgrounds.

## How to set up

In the block library, select a block to edit. Add a new field, set the _Field Type_ to _Plugin_, and set the _Custom
Type_ to `storyblok-palette`.

Configure the options:

* `colors`: A JSON encoded array of hex color strings. For example:

~~~json
[   "#00B3B0", "#40C6C4", "#7FD9D7", "#D9F4F3",   "#1B243F", "#545B6F", "#8D919F", "#C6C8CF",   "#B1B5BE", "#DFE3E8", "#E7EAEE", "#EFF1F3",   "#2DB47D", "#62C79E", "#96D9BE", "#CAECDE",   "#395ECE", "#6B87DB", "#9CAEE6", "#CDD7F3",   "#FBCE41", "#FCDB71", "#FDE6A0", "#FEF3CF",   "#FFAC00", "#FFC140", "#FFD57F", "#FFEABF",   "#FF6159", "#FF8983", "#FFB0AC", "#FFD7D5"]
~~~

* `defaultValue` (optional): One of the values in `color` without the quotes. For example `#00B3B0`.
* `size` (optional): `small`, `medium`, or `large`

Example output:

~~~json
{
   "plugin": "jl-dev", 
   "value": "#DFE3E8"
}
~~~

If the `defaultValue` option is not defined, the user can de-select the color. In this case, the value from the field
type will be `undefined`. If the `defaultValue` is defined, the user will not be able to de-select the color.
