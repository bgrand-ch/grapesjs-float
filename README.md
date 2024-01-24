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
  floatingElement: HTMLElement // optional, if specified in "float:show-element" command options
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

import type { PluginOptions, CommandOptions } from 'grapesjs-float'

const pluginOptions: PluginOptions = {
  floatingElement: HTMLElement // optional, if specified in "float:show-element" command options
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

```ts
// Your reference HTML element.
const selectedEl = editor.getSelected()?.getEl()

// Your floating HTML element.
const floatingEl = document.getElementById('floating-element')
```

> Full demonstration in the [`src/example.ts`](https://github.com/bgrand-ch/grapesjs-float/blob/main/src/example.ts) file.

### Show floating element

```ts
const commandOptions: CommandOptions = {
  referenceElement: selectedEl, // optional, selected component by default
  floatingElement: floatingEl // optional, if specified in the plugin options
}

editor.runCommand('float:show-element', commandOptions)
```

### Hide floating element

```ts
const commandOptions: CommandOptions = {
  referenceElement: selectedEl, // optional, selected component by default
  floatingElement: floatingEl // optional, your floating html element by default
}

editor.runCommand('float:hide-element', commandOptions)
```

## Events

### On floating element shown

```ts
editor.on('float:show-element', (floatingElement, referenceElement) => {
  console.log('Floating element is shown', {
    floatingElement,
    referenceElement
  })
})
```

### On floating element hidden

```ts
editor.on('float:hide-element', (floatingElement, referenceElement) => {
  console.log('Floating element is hidden', {
    floatingElement,
    referenceElement
  })
})
```

## Options

```ts
{
  floatingElement: HTMLElement // optional, if specified in "float:show-element" command options
}
```

## Question? Idea?

If you have a question about how `grapesjs-float` works or an idea to improve it, the [Discussions](https://github.com/bgrand-ch/grapesjs-float/discussions) tab in GitHub is the place to be.

However, if you get an error, you should open an [issue](https://github.com/bgrand-ch/grapesjs-float/issues).

## License

Distributed under the BSD 3-Clause License. See [LICENSE](https://github.com/bgrand-ch/grapesjs-float/blob/main/LICENSE.md) for more information.

## Contact

Benjamin Grand [@bgrand_ch](https://twitter.com/bgrand_ch)
