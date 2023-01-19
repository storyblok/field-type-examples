<p style="text-align: center">
  <a href="https://www.storyblok.com/" rel="noopener">
 <img width=150px src="https://a.storyblok.com/f/51376/3856x824/fea44d52a9/colored-full.png" alt="Storyblok" style="display:inline-block;margin:20px;"></a>
</p>

<h1>
<img src="assets/icon.svg" height="26px">
Slider Field Plugin
</h1>

A field plugin for Storyblok that allow users to select a number value from a range.

![demo.gif](assets/screenshot.png)

![demo.gif](docs/demo.gif)

## How to use

To add this field plugin to a Storyblok space, you need to

1. Create a new field plugin in the Storyblok app.
2. Open `src/entries/main.ts` and change the `pluginName` argument from `'storyblok-slider'` to the name of your plugin.
3. Run

```bash
# install dependencies
yarn install

# build the plugin
yarn build
```

4. Copy the contents of `dist/main.js` into the field plugin editor.
5. Save
6. Publish

### Options

These options are available

* `minValue`: The minimum value of the slider's range.
* `maxValue`: The maximum value of the slider's range.
* `defaultValue`: The starting position of the slider. The number must be within the range.
* `stops`: A JSON array of numbers. The numbers must be within the range. For each value in this array, a mark will be shown, together with a label for the value. For example, for the range `[-10, 10]`, you can use the the stops `[-5, 0, 5]`.