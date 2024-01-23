import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { onShowFloatingElement, onHideFloatingElement } from './command'
import { updateFloatingPosition, showFloatingElement, hideFloatingElement } from './utils/floating'

import type { Plugin, Component } from 'grapesjs'
import type { PluginOptions, CommandOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options = {}) => {
  const { hasSelectionTracked = false, floatingElement } = options
  const editorCommands = editor.Commands

  editorCommands.add(showFloatingCommand, onShowFloatingElement(options))
  editorCommands.add(hideFloatingCommand, onHideFloatingElement(options))

  if (!hasSelectionTracked) {
    return
  }

  if (!floatingElement) {
    console.warn(`${logScope} "floatingElement" is required to track selection`)
    return
  }

  editor.on('component:selected', (selectedComponent: Component) => {
    const selectedEl = selectedComponent.getEl()

    if (!selectedEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: selectedEl,
      floatingElement
    }

    editor.runCommand(showFloatingCommand, commandOptions)
  })

  editor.on('component:deselected', (deselectedComponent: Component) => {
    const deselectedEl = deselectedComponent.getEl()

    if (!deselectedEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: deselectedEl,
      floatingElement
    }
  
    editor.runCommand(hideFloatingCommand, commandOptions)
  })
}

export default plugin

// Utilities
export {
  updateFloatingPosition,
  showFloatingElement,
  hideFloatingElement
}
