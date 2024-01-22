// This file is only used by Vite during development.
// It is ignored when the files are built.

import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsBlocks from 'grapesjs-blocks-basic'
import grapesjsFloat, { showFloatingElement, hideFloatingElement } from './plugin'
import { showFloatingCommand } from './utils/constant'

import type { Component } from 'grapesjs'
import type { CommandOptions } from './types'

const floatIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M230.47 67.5a12 12 0 0 0-19.26-4.32L172.43 99l-12.68-2.72L157 83.57l35.79-38.78a12 12 0 0 0-4.32-19.26a76 76 0 0 0-99.23 98.27L31.17 174c-.22.19-.44.39-.64.6a36 36 0 0 0 50.91 50.91c.21-.2.41-.42.6-.64l50.16-58.07a76 76 0 0 0 98.27-99.3M160 148a52.1 52.1 0 0 1-25.13-6.46A12 12 0 0 0 120 144.2l-55.79 64.55a12 12 0 0 1-17-17L111.8 136a12 12 0 0 0 2.65-14.89A52 52 0 0 1 160 44h.89l-25.72 27.87a12 12 0 0 0-2.91 10.65l5.66 26.35a12 12 0 0 0 9.21 9.21l26.35 5.66a12 12 0 0 0 10.65-2.91L212 95.12v.89A52.06 52.06 0 0 1 160 148"/></svg>'

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

  // Update the toolbar of the selected component to add the float action.
  editor.on('component:selected', (selectedComponent: Component) => {
    const componentSettings = selectedComponent.getTraits()
    const toolbar = selectedComponent.toolbar

    const hasSettings = componentSettings.length > 0
    const hasFloatAction = toolbar.some(({ command }) => command === showFloatingCommand)

    if (
      !hasSettings ||
      hasFloatAction
    ) {
      return
    }

    toolbar.unshift({
      label: floatIcon,
      command: showFloatingCommand,
      attributes: {
        title: 'Show floating element'
      }
    })

    selectedComponent.set({ toolbar })
  })
}

runExample()
