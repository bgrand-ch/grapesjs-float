# GrapesJS float plugin with Floating UI

> `grapesjs-float` plugin is not an official Floating UI plugin and is not maintained by the Floating UI team. If you use `grapesjs-float` plugin, please [donate to Floating UI](https://opencollective.com/floating-ui).

## Installation

```shell
npm install grapesjs grapesjs-float @floating-ui/dom
```

## Usage

### JavaScript

```js
import grapesjs from 'grapesjs'
import grapesjsFloat from 'grapesjs-float'

const pluginOptions = {
  hasSelectionTracked: boolean // optional, default to true
}
const editor = grapesjs.init({
  // ...
  plugins: [
    grapesjsFloat
  ],
  pluginOpts: {
    [grapesjsFloat]: pluginOptions
  }
  // ...
})
```

### TypeScript

```ts
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsFloat from 'grapesjs-float'

const pluginOptions = {
  hasSelectionTracked: boolean // default to true
}
const editor = grapesjs.init({
  // ...
  plugins: [
    usePlugin(grapesjsFloat, pluginOptions)
  ]
  // ...
})
```

## Commands

### Show floating element

```ts
const commandOptions = {
  floatingElement: HTMLElement, // required, your floating html element ("display: none;", v-show, etc.)
  referenceElement: HTMLElement // optional, selected component by default
}
editor.run('float:show-element', commandOptions)
```

### Hide floating element

```ts
const commandOptions = {
  floatingElement: HTMLElement, // optional, your floating html element ("display: none;", v-show, etc.)
  referenceElement: HTMLElement // optional, selected component by default
}
editor.run('float:hide-element', commandOptions)
```

## Options

```ts
{
  // Floating element reference updated when a component is selected.
  hasSelectionTracked: boolean // optional, default to true
}
```

## Question? Idea?

If you have a question about how `grapesjs-float` works or an idea to improve it, the [Discussions](https://github.com/bgrand-ch/grapesjs-float/discussions) tab in GitHub is the place to be.

However, if you get an error, you should open an [issue](https://github.com/bgrand-ch/grapesjs-float/issues).

## License

Distributed under the BSD 3-Clause License. See [LICENSE](https://github.com/bgrand-ch/grapesjs-float/blob/main/LICENSE.md) for more information.

## Contact

Benjamin Grand [@bgrand_ch](https://twitter.com/bgrand_ch)
