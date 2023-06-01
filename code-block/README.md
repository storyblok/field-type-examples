# Storyblok Field Plugin in React

This React project is designed to function as a Storyblok field plugin application. It showcases some fundamental features for field plugins, including value updates, modal toggling, and asset selection. The primary goal of this starter is to provide developers with a clear blueprint for creating custom field plugins.

To remove the example code, simply delete the `src/components/` directory and alter the imports and returned `JSX` in `src/App.tsx`.

For those who prefer to work with JavaScript instead of TypeScript, they can rename src/App.tsx to src/App.jsx.

## Local Development

To start the project locally, run:

```bash
yarn dev
```

## What's next?

If you want to deploy your field plugin to Storyblok, you can do so by using our [CLI](https://www.npmjs.com/package/@storyblok/field-plugin-cli).

# App Description

The Code Block extension for is a lightweight text editor tailored for developers and content creators. It provides a seamless solution for pasting code snippets into documentation sites or other platforms. With customizable titles, programming language options, line number offsets, and line highlighting, this user-friendly extension allows you to effortlessly manage and present code snippets with clarity and precision. Enhance your documentation workflow and make code sharing a breeze with the Code Block extension.

## How to set up

In the Block Library, select a block to edit. Add a new field, set the _Field Type_ to _Plugin_, and set the _Custom Type_ to `storyblok-code-block`.

Configure the options:

- `enableTitle`: (optional) if set to `true`, users can provide a title (`content.title`).
- `languages`: (optional) a JSON array of strings. The strings are the languages that the user can choose between.
  ```json
  ["JavaScript", "TypeScript", "Elm", "Vue", "Rust", "JSON"]
  ```
  If this option is omitted, the language select input is hidden.
- `enableLineNumberStart`: (optional) if set to `true`, users can change the starting line numbers (`content.lineNumberStart`).
- `highlightStates`: (optional) A JSON array of objects. Each object has two properties: `value` (`string`) and `color` (`string`). For example:
  ```json
  [
    {
      "value": "attention",
      "color": "#fbce41"
    },
    {
      "value": "add",
      "color": "#2db47d"
    },
    {
      "value": "remove",
      "color": "#ff6159"
    }
  ]
  ```
  The color will be used to highlight lines on the screen inside the Visual Editor, while the value will be used in the content to indicate which lines were highlighted by the user.
  If this option is omitted, line highlighting is turned off.

Example output:

```json
{
  "code": "\"output\": {\n  \"dest\": \"./dist/index.js\",\n  \"dest\": \"./dist/index.cjs\",\n  \"types\": \"./dist/types.d.ts\",\n}",
  "highlightStates": ["", "remove", "add", "", ""],
  "title": "myfile.json",
  "language": "json",
  "lineNumberStart": 10
}
```

Given that `options.highlightStates` were configured as in the example above.

Note that all properties except `code` are optional.
