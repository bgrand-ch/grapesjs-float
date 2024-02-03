import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { showFloatingElement, hideFloatingElement } from './utils/floating'
import { getSelectedElement } from './utils/element'

import type { Editor } from 'grapesjs'
import type { PluginOptions, CommandOptions, Store } from './types'

const store: Store = {}

export function onShowFloatingElement (pluginOptions: PluginOptions) {
  return (editor: Editor, sender: unknown, options: CommandOptions) => {
    try {
      const { isDebugging } = options

      if (isDebugging) {
        console.log(`${logScope} onShowFloatingElement`, {
          editor,
          sender,
          options,
          pluginOptions
        })
      }

      const referenceElement = options.referenceElement || getSelectedElement(editor)

      if (!referenceElement) {
        throw new Error('"referenceElement" is empty')
      }

      const floatingElement = options.floatingElement || pluginOptions.floatingElement

      if (!floatingElement) {
        throw new Error('"floatingElement" is required')
      }

      if (store.stopAutoUpdate) {
        store.stopAutoUpdate()
      }

      store.floatingElement = floatingElement
      store.stopAutoUpdate = showFloatingElement(referenceElement, floatingElement)

      if (!store.stopAutoUpdate) {
        throw new Error('"stopAutoUpdate" is empty')
      }

      editor.trigger(showFloatingCommand, floatingElement, referenceElement)
    } catch (err) {
      const { message } = err as Error
      console.warn(`${logScope} onShowFloatingElement - ${message}`)
    }
  }
}

export function onHideFloatingElement (pluginOptions: PluginOptions) {
  return (editor: Editor, sender: unknown, options: CommandOptions) => {
    try {
      const { isDebugging } = options

      if (isDebugging) {
        console.log(`${logScope} onHideFloatingElement`, {
          editor,
          sender,
          options,
          pluginOptions
        })
      }

      const referenceElement = options.referenceElement || getSelectedElement(editor)

      if (!referenceElement) {
        throw new Error('"referenceElement" is empty')
      }

      const floatingElement = store.floatingElement || options.floatingElement || pluginOptions.floatingElement

      if (!floatingElement) {
        throw new Error('"floatingElement" is required')
      }

      hideFloatingElement(floatingElement, store.stopAutoUpdate)

      delete store.floatingElement
      delete store.stopAutoUpdate

      editor.trigger(hideFloatingCommand, floatingElement, referenceElement)
    } catch (err) {
      const { message } = err as Error
      console.warn(`${logScope} onHideFloatingElement - ${message}`)
    }
  }
}
