// This file is only used by Vite during development.
// It is ignored when the files are built.
// It is an example, a demonstration.

import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsBlocks from 'grapesjs-blocks-basic'
import grapesjsFloat from './plugin'
import { showFloatingCommand, hideFloatingCommand } from './utils/constant'

import type { Component } from 'grapesjs'
import type { CommandOptions } from './types'

function capitalizeValue (value?: string) {
  if (typeof value !== 'string') {
    return ''
  }

  return (
    value.charAt(0).toUpperCase() +
    value.replace(/[_-]+/, ' ').slice(1)
  )
}

function runExample () {
  const editor = grapesjs.init({
    container: '#editor', // same as id in the "index.html" file
    height: '100vh',
    fromElement: true,
    storageManager: false,
    plugins: [
      usePlugin(grapesjsBlocks, {
        flexGrid: true
      }),
      usePlugin(grapesjsFloat)
    ]
  })
  const floatingEl = document.getElementById('floating-element')!

  editor.once('load', () => {
    console.log('Editor loaded', editor)
  })

  // Show the floating element around the selected component.
  editor.on('component:selected', (selectedComponent: Component) => {
    const { type: componentType, name: componentName = '' } = selectedComponent.props()
    const selectedEl = selectedComponent.getEl()

    if (!selectedEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: selectedEl,
      floatingElement: floatingEl,
      isDebugging: true
    }

    editor.runCommand(showFloatingCommand, commandOptions)

    const label = capitalizeValue(componentType) || componentName

    floatingEl.textContent = `${label} (styles, settings, ...)`
  })

  // Hide the floating element.
  editor.on('component:deselected', (deselectedComponent: Component) => {
    const deselectedEl = deselectedComponent.getEl()

    if (!deselectedEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: deselectedEl,
      floatingElement: floatingEl,
      isDebugging: true
    }
  
    editor.runCommand(hideFloatingCommand, commandOptions)

    floatingEl.textContent = ''
  })
}

runExample()
