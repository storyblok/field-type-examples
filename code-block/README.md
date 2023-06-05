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

The Code Block plugin is a lightweight text editor tailored for developers and content creators. With customizable titles, programming language options, line number offsets, and line highlighting, this user-friendly extension allows you to effortlessly manage and present code snippets with clarity and precision. Enhance your documentation and make code sharing a breeze with the Code Block plugin.

The plugin features

- Code editor
- Title
- Language select
- Line number offset
- Line highlighting

## How to set up

In the Block Library, select a block to edit. Add a new field, set the _Field Type_ to _Plugin_, and set the _Custom Type_ to `storyblok-code-block`.

Configure the options:

- `enableTitle`: (optional) if set to `true`, users can provide a title (`content.title`).
- `languages`: (optional) a JSON array of strings. The strings are the languages that the user can choose between. For example:
  ```json
  [
    "Ada",
    "Bash",
    "C",
    "Dart",
    "Elm",
    "F#",
    "Haskell",
    "JavaScript",
    "JSON",
    "TypeScript"
  ]
  ```
  If this option is omitted, the language select input is hidden.
- `enableLineNumberStart`: (optional) if set to `true`, users can change the starting line numbers (`content.lineNumberStart`).
- `highlightStates`: (optional) A JSON array of at least two objects. Each object has two properties: `value` (`string`) and `color` (`string`). For example:
  ```json
  [
    {
      "value": "",
      "color": "transparent"
    },
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
  The `color` will be used to highlight lines on the screen inside the Visual Editor, while the `value` will be used in the content to indicate which lines were highlighted by the user. By default, lines will not be highlighted and have the value of an empty string (`""`).
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

## Examples

For each feature that is enabled (title, line highlight, language, line number offset), you will need to implement a corresponding change in your user-facing application. The exact solution will depend on the technologies that you use and the result that you wish to obtain. For websites, two popular, lightweight options are:

- [highlight.js](https://highlightjs.org/) -- a pluggable, lightweight syntax highlighter. Line numbers require you to install a plugin.
- [CodeMirror](https://codemirror.net/) -- a pluggable, lightweight code editor. The code block editor plugin was built with this library.

Note that the examples below might be outdated with newer versions of Highlight.js and CodeMirror. The aim is to show how it can be done _in principle_.

### Highlight.js and Style Sheets

With highlight.js, you first need to enable line numbers. This example is using [highlightjs-line-numbers.js](https://www.npmjs.com/package/highlightjs-line-numbers.js).

Assuming that a reference to the Highlight.js root element (the `pre` element) is stored in the `highlightJsRoot` variable, and that your code block content is `content`, run

```js
highlightJsRoot
  .querySelectorAll('tbody > tr')
  .forEach((rowElement, rowIndex) => {
    const highlightState = content.highlightStates[rowIndex]
    if (highlightState === '') {
      return
    }
    const className = `code-block__row--${highlightState}`
    rowElement.classList.add(className)
  })
```

This traverses all the line elements in the document and adds a class that corresponds to the highlighted state. For example, if `content` is

```json
{
  "content": "console.log(1)\nconsole.log(1)",
  "highlightStates": ["add", ""]
}
```

Then the first line will have the class `code-block__row--add`, while the second line will not be unaltered.

Finally, simply update your stylesheets as such:

```css
.code-block__row--neutral {
  background-color: #fbce4190;
}
.code-block__row--add {
  background-color: #2db47d90;
}
.code-block__row--remove {
  background-color: #ff615990;
}
```

### CodeMirror and CSS-in-JS

With CodeMirror, enable read-only mode and enable line number gutters:

```js
import { EditorView, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

new EditorView({
  doc: content.code,
  extensions: [EditorState.readOnly.of(true), lineNumbers()],
})
```

Where `content` is the content output from the Code Block plugin.

With a CSS-in-JS library such as [Emotion](https://emotion.sh), generate style sheets that use the [:nth-of-type()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type) selector:

```js
css(
  content.highlightStates.map((highlightState, rowIndex) => ({
    [`.cm-line:tr:nth-of-type(${rowIndex})`]: {
      backgroundColor: colorFromHighlightState(highlightState),
    },
  })),
)
```

where `colorFromHighlightState` maps elements of the `content.highlightStates` array to HTML colors. The benefit with this approach is that your DOM nodes are unaltered and the styles can be rendered on the server.

## Source Code

You'll find the source code for this field plugin on GitHub: https://github.com/storyblok/field-type-examples/tree/main/code-block.
