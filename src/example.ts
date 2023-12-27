// This file is only used by Vite during development.
// It is ignored when the files are built.

import 'grapesjs/dist/css/grapes.min.css'

import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsBlocks from 'grapesjs-blocks-basic'
import grapesjsFloat from './plugin'
import { showFloatingCommand } from './utils/constant'

import type { CommandOptions } from './types'

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

  const getElement = (textContent: string) => {
    const divElement = document.getElementById('element') as HTMLDivElement
    divElement.textContent = textContent

    return divElement
  }

  const showFloatingElement = (floatingElement: HTMLElement) => {
    const editorCommands = editor.Commands
    const commandOptions: CommandOptions = {
      floatingElement,
      isDebugging: true
    }

    editorCommands.run(showFloatingCommand, commandOptions)
  }

  editor.on('load', () => {
    console.log('Editor loaded', editor)

    const element = getElement('Floating element (auto update)')
    showFloatingElement(element)
  })
}

runExample()
