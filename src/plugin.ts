import { showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { onShowFloatingElement, onHideFloatingElement } from './command'
import { updateFloatingPosition, showFloatingElement, hideFloatingElement } from './utils/floating'

import type { Plugin, Component } from 'grapesjs'
import type { PluginOptions, CommandOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options = {}) => {
  const { hasSelectionTracked = true } = options
  const editorCommands = editor.Commands

  editorCommands.add(showFloatingCommand, onShowFloatingElement)
  editorCommands.add(hideFloatingCommand, onHideFloatingElement)

  if (!hasSelectionTracked) {
    return
  }

  editor.on('component:deselected', (deselectedComponent: Component) => {
    const timeoutId = window.setTimeout(() => {
      try {
        const previousElement = deselectedComponent.getEl()

        if (!previousElement) {
          return
        }

        const commandOptions: CommandOptions = {
          previousElement,
          isDebugging: true
        }

        editorCommands.run(showFloatingCommand, commandOptions)
      } finally {
        window.clearTimeout(timeoutId)
      }
    }, 250)
  })
}

export default plugin

// Utilities
export {
  updateFloatingPosition,
  showFloatingElement,
  hideFloatingElement
}
