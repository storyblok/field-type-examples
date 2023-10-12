# Storyblok Field Plugin in React

This React project is designed to function as a Storyblok field plugin application. It showcases some fundamental features for field plugins, including value updates, modal toggling, and asset selection. The primary goal of this starter is to provide developers with a clear blueprint for creating custom field plugins.

To remove the example code, simply delete the `src/components/` directory and alter the imports and returned `JSX` in `src/App.tsx`.

For those who prefer to work with JavaScript instead of TypeScript, they can rename src/App.tsx to src/App.jsx.

## Usage

For development, run the application locally with

```shell
npm run dev
```

and open the [Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/).

To build the project, run

```shell
npm run build
```

Deploy the field plugin with the CLI. Issue a [personal access token](https://app.storyblok.com/#/me/account?tab=token), rename `.env.local.example` to `.env.example`, open the file, set the value `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and run

```shell
npm run deploy
```

## Next Steps

Read more about field plugins [on GitHub](https://github.com/storyblok/field-plugin).

Set up continuous integration with the [CLI](https://www.npmjs.com/package/@storyblok/field-plugin-cli). Define an environmental variable `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and use the `--name` and `--skipPrompts` options as such:

```shell
npm run deploy --name $NAME --skipPrompts
```

[@storyblok/mui](https://www.npmjs.com/package/@storyblok/mui) contains a component library and theme for [MUI](https://mui.com/). To add it to this project, follow the instructions in the [readme](https://github.com/storyblok/mui).

## Clean up the boilerplate

To start from a blank state, remove the example component `<FieldPluginExample />` from `src/App.tsx` with `<FieldPlugin />`.
