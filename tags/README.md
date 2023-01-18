<p align="center">
  <a href="https://www.storyblok.com/" rel="noopener">
 <img width=150px src="https://a.storyblok.com/f/51376/3856x824/fea44d52a9/colored-full.png" alt="Storyblok" style="display:inline-block;margin:20px;"></a>
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

Ensure that the `name` property in `src/main.ts` equals that of your plugin name in the storyblok application.

Copy the contents of the `dist/export.js` file into the [plugin section](https://app.storyblok.com/#!/me/plugins) of Storyblok.

> **TIP**: On MacOs, run `yarn mac-build`. This will copy the text content of the `export.js` to your clipboard.
