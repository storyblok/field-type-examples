# Picker Starter

A starter project for building e-commerce [field plugins](https://www.storyblok.com/docs/plugins/field-plugins/introduction) and other “picker” field plugins – for example, integrations with digital asset management (DAM) systems.

![screenshot](./docs/screenshot.png)

The primary goal of this starter is to provide developers with a clear blueprint for creating their own `pickers` just by making small changes to it.

## `picker.config.ts`

The [`picker.config.ts`](./src/picker.config.ts) is a configuration file where you can customize the title, icon, tabs, filters, methods to perform queries, and also a method to validate the expected [plugin options](https://www.storyblok.com/docs/plugins/field-plugins/introduction#options).

In the example below you can have a glimpse of what this file looks like and its responsibilities:

```js
export default defineConfig((options) => {
  return {
    title: 'Picker Starter', //(1) modal's title
    icon: StoryblokIcon, //(2) modal's icon
    validateOptions: () => {
      //(3) optional function responsible for validating the plugin's options and showing a warning box in case of failure.
      const { limit } = options

      const isLimitOptionValid = limit === undefined || Number(limit) > 0

      if (!isLimitOptionValid) {
        //(3) In case of failure, the returned object needs to look like this
        return {
          isValid: false,
          error: `The 'limit' option must be an integer greater than 0`,
        }
      }

      //If all the options are valid (in case it relies on options)
      //the returned object will look like this
      return {
        isValid: true,
      }
    },
    tabs: [
      //(4) All of your Picker's tabs.
      //You can have as many as your picker needs.
      {
        name: 'items', //mandatory field used to identify this tab
        label: 'Items', //(5) displayed in the modal
        query: queryItems, //(6) it fetches, sorts, and filter all the data for this tab
        getFilters: getItemFilters, //(7) select input acting like filters to the data
      },
    ],
  }
})
```

![mapping 1 picker.config.ts](./docs/picker.config-1.png)
![mapping 2 picker.config.ts](./docs/picker.config-2.png)

## Local Development

To start using this starter locally in your project, just run:

```sh
# copy this starter into your cwd
npx giget@latest gh:storyblok/field-type-examples/picker-starter YOUR-PROJECT-NAME

# open it
cd YOUR-PROJECT-NAME

# install all required dependencies
yarn install

# then, serve the field plugin
yarn dev
```

Now open the Sandbox URL printed in your terminal:
![open sandbox url](./docs/open-sandbox-url.png)

You should see this:

![picker starter loaded](./docs/loaded-sandbox.png)

## Deploy

Deploy your field plugin with the [CLI](https://www.npmjs.com/package/@storyblok/field-plugin-cli). Issue a [personal access token](https://app.storyblok.com/#/me/account?tab=token), rename `.env.local.example` to `.env.example`, open the file, set the value `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and from the **plugin's root folder**, run the following command:

```shell
yarn deploy
```
