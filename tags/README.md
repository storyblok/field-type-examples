<h3 align="center">Field-Type E-Commerce</h3>

<p align="center">
  <a href="https://www.storyblok.com/" rel="noopener">
 <img width=150px src="https://a.storyblok.com/f/51376/3856x824/fea44d52a9/colored-full.png" alt="Storyblok" style="display:inline-block;margin:20px;"></a>
</p>

<p align="center"> 
  A custom field-type to select products or categories from a e-commerce store and save the information in Storyblok.
</p>


## Export Plugin

In order to use the plugin in Storyblok, you need to build it first.

```bash
# install dependencies
npm install

# build plugin
npm run build
```

### Import plugin into Storyblok

Ensure that the `pluginName` property in `src/config.ts` equals that of your plugin name in the storyblok application. 

Copy the contents of the `dist/export.js` file into the [plugin section](https://app.storyblok.com/#!/me/plugins) of Storyblok.

> **TIP**: On MacOs, run `yarn mac-build`. This will copy the text content of the `export.js` to your clipboard. 

### Define Options

Set up all the available options. See the available options in [options.ts](src/plugin/types/options.ts).

### Usage

The value of a field type of this plugin will adhere to the schema defined in [field-value.ts](src/plugin/types/model.ts).
