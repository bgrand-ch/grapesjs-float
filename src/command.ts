import { logScope, showFloatingCommand, hideFloatingCommand } from './utils/constant'
import { showFloatingElement, hideFloatingElement } from './utils/floating'
import { getSelectedElement, getFloatingElement } from './utils/element'

import type { Editor } from 'grapesjs'
import type { CommandOptions } from './types'

const autoUpdateManager = new Map<HTMLElement, () => void>()
const floatingElementManager = new Map<HTMLElement, HTMLElement>()

export function onShowFloatingElement (editor: Editor, sender: unknown, options: CommandOptions) {
  try {
    const { isDebugging, referenceElement, previousElement } = options

    if (isDebugging) {
      console.log(`${logScope} onShowFloatingElement`, {
        editor,
        sender,
        options
      })
    }

    const selectedElement = referenceElement || getSelectedElement(editor)

    if (!selectedElement) {
      throw new Error('"selectedElement" is empty')
    }

    const floatingElement = (
      options.floatingElement ||
      getFloatingElement(floatingElementManager, selectedElement, previousElement)
    )

    if (!floatingElement) {
      throw new Error('"floatingElement" is required')
    }

    const currStopAutoUpdate = autoUpdateManager.get(selectedElement)

    if (currStopAutoUpdate) {
      currStopAutoUpdate()
    }

    const stopAutoUpdate = showFloatingElement(selectedElement, floatingElement)

    if (!stopAutoUpdate) {
      throw new Error('"stopAutoUpdate" is empty')
    }

    autoUpdateManager.set(selectedElement, stopAutoUpdate)

    if (options.floatingElement) {
      floatingElementManager.set(selectedElement, floatingElement)
    }

    editor.trigger(showFloatingCommand, floatingElement, selectedElement, previousElement)
  } catch (err) {
    const { message } = err as Error
    console.warn(`${logScope} onShowFloatingElement - ${message}`)
  }
}

export function onHideFloatingElement (editor: Editor, sender: unknown, options: CommandOptions) {
  try {
    const { isDebugging, referenceElement, previousElement } = options

    if (isDebugging) {
      console.log(`${logScope} onHideFloatingElement`, {
        editor,
        sender,
        options
      })
    }

    const selectedElement = referenceElement || getSelectedElement(editor)

    if (!selectedElement) {
      throw new Error('"selectedElement" is empty')
    }

    const floatingElement = (
      options.floatingElement ||
      getFloatingElement(floatingElementManager, selectedElement, previousElement)
    )

    if (!floatingElement) {
      throw new Error('"floatingElement" is required')
    }

    const stopAutoUpdate = autoUpdateManager.get(selectedElement)

    hideFloatingElement(floatingElement, stopAutoUpdate)
    autoUpdateManager.delete(selectedElement)

    if (options.floatingElement) {
      floatingElementManager.delete(selectedElement)
    }

    editor.trigger(hideFloatingCommand, floatingElement, selectedElement, previousElement)
  } catch (err) {
    const { message } = err as Error
    console.warn(`${logScope} onHideFloatingElement - ${message}`)
  }
}
