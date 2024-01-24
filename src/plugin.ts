import { showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { onShowFloatingElement, onHideFloatingElement } from './command'
import { updateFloatingPosition, showFloatingElement, hideFloatingElement } from './utils/floating'

import type { Plugin } from 'grapesjs'
import type { PluginOptions } from './types'

const plugin: Plugin<PluginOptions> = (editor, options = {}) => {
  const editorCommands = editor.Commands

  editorCommands.add(showFloatingCommand, onShowFloatingElement(options))
  editorCommands.add(hideFloatingCommand, onHideFloatingElement(options))
}

export default plugin

export * from './types'

// Utilities
export {
  updateFloatingPosition,
  showFloatingElement,
  hideFloatingElement
}
