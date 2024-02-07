import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { showFloatingElement, hideFloatingElement } from './utils/floating'
import { getSelectedElement } from './utils/element'
import { getStoreValue, addStoreValue, resetStore } from './utils/store'
import { hasAvailableElement } from './utils/element'

import type { Editor } from 'grapesjs'
import type { PluginOptions, CommandOptions } from './types'

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

      if (
        !referenceElement ||
        !hasAvailableElement(referenceElement)
      ) {
        throw new Error('"referenceElement" is empty')
      }

      const floatingElement = options.floatingElement || pluginOptions.floatingElement

      if (
        !floatingElement ||
        !hasAvailableElement(floatingElement)
      ) {
        throw new Error('"floatingElement" is required')
      }

      const store = getStoreValue()

      if (store.stopAutoUpdate) {
        store.stopAutoUpdate()
      }

      const stopAutoUpdate = showFloatingElement(referenceElement, floatingElement)

      if (!stopAutoUpdate) {
        throw new Error('"stopAutoUpdate" is empty')
      }

      addStoreValue({
        floatingElement,
        stopAutoUpdate
      })

      editor.trigger(showFloatingCommand, floatingElement, referenceElement)
    } catch (err) {
      const { message } = err as Error
      console.warn(`${logScope} onShowFloatingElement - ${message}`)

      resetStore()
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

      if (
        !referenceElement ||
        !hasAvailableElement(referenceElement)
      ) {
        throw new Error('"referenceElement" is empty')
      }

      const store = getStoreValue()

      let floatingElement = options.floatingElement || pluginOptions.floatingElement

      // Is the stored floating element currently in the dom?
      if (store.floatingElement) {
        floatingElement = store.floatingElement
      }

      if (
        !floatingElement ||
        !hasAvailableElement(floatingElement)
      ) {
        throw new Error('"floatingElement" is required')
      }

      hideFloatingElement(floatingElement)

      editor.trigger(hideFloatingCommand, floatingElement, referenceElement)
    } catch (err) {
      const { message } = err as Error
      console.warn(`${logScope} onHideFloatingElement - ${message}`)
    } finally {
      resetStore()
    }
  }
}
