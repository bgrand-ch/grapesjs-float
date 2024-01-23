import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { showFloatingElement, hideFloatingElement } from './utils/floating'
import { getSelectedElement } from './utils/element'

import type { Editor } from 'grapesjs'
import type { PluginOptions, CommandOptions } from './types'

const autoUpdateManager = new Map<HTMLElement, () => void>()
const floatingElementManager = new Map<HTMLElement, HTMLElement>()

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

      const floatingElement = options.floatingElement || pluginOptions.floatingElement
  
      if (!floatingElement) {
        throw new Error('"floatingElement" is required')
      }
  
      const referenceElement = options.referenceElement || getSelectedElement(editor)
  
      if (!referenceElement) {
        throw new Error('"referenceElement" is empty')
      }
  
      const currStopAutoUpdate = autoUpdateManager.get(referenceElement)
  
      if (currStopAutoUpdate) {
        currStopAutoUpdate()
      }
  
      const stopAutoUpdate = showFloatingElement(referenceElement, floatingElement)
  
      if (!stopAutoUpdate) {
        throw new Error('"stopAutoUpdate" is empty')
      }
  
      floatingElementManager.set(referenceElement, floatingElement)
      autoUpdateManager.set(referenceElement, stopAutoUpdate)
  
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

      const floatingElement = options.floatingElement || pluginOptions.floatingElement
  
      if (!floatingElement) {
        throw new Error('"floatingElement" is required')
      }
  
      const referenceElement = options.referenceElement || getSelectedElement(editor)
  
      if (!referenceElement) {
        throw new Error('"referenceElement" is empty')
      }

      const stopAutoUpdate = autoUpdateManager.get(referenceElement)

      hideFloatingElement(floatingElement, stopAutoUpdate)

      floatingElementManager.delete(referenceElement)
      autoUpdateManager.delete(referenceElement)
  
      editor.trigger(hideFloatingCommand, floatingElement, referenceElement)
    } catch (err) {
      const { message } = err as Error
      console.warn(`${logScope} onHideFloatingElement - ${message}`)
    }
  }
}
