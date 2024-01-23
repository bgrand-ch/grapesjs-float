import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { onShowFloatingElement, onHideFloatingElement } from './command'
import { updateFloatingPosition, showFloatingElement, hideFloatingElement } from './utils/floating'
import { floatingElementStore } from './utils/store'

import type { Plugin, Component } from 'grapesjs'
import type { PluginOptions, CommandOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options = {}) => {
  const { hasSelectionTracked = false } = options
  const editorCommands = editor.Commands

  editorCommands.add(showFloatingCommand, onShowFloatingElement(options))
  editorCommands.add(hideFloatingCommand, onHideFloatingElement(options))

  if (!hasSelectionTracked) {
    return
  }

  const getFloatingElement = (element: HTMLElement) => {
    const floatingEl = floatingElementStore.get(element)

    if (!floatingEl) {
      console.warn(`${logScope} "floatingEl" is required, run "${showFloatingCommand}" before`)
      return
    }

    return floatingEl
  }

  editor.on('component:selected', (selectedComponent: Component) => {
    const selectedEl = selectedComponent.getEl()

    if (!selectedEl) {
      return
    }

    const floatingEl = getFloatingElement(selectedEl)

    if (!floatingEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: selectedEl,
      floatingElement: floatingEl
    }

    editor.runCommand(showFloatingCommand, commandOptions)
  })

  editor.on('component:deselected', (deselectedComponent: Component) => {
    const deselectedEl = deselectedComponent.getEl()

    if (!deselectedEl) {
      return
    }

    const floatingEl = getFloatingElement(deselectedEl)

    if (!floatingEl) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: deselectedEl,
      floatingElement: floatingEl
    }

    editor.runCommand(hideFloatingCommand, commandOptions)
  })
}

export default plugin

export * from './types'

// Utilities
export {
  updateFloatingPosition,
  showFloatingElement,
  hideFloatingElement
}
