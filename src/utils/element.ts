import type { Editor } from 'grapesjs'

export function hasAvailableElement (element?: HTMLElement) {
  return element?.isConnected === true
}

export function getSelectedElement (editor: Editor) {
  const selectedComponent = editor.getSelected()
  const wrapperComponent = editor.getWrapper()

  if (!selectedComponent && wrapperComponent) {
    // editor.select(wrapperComponent)
    return wrapperComponent.getEl()
  }

  return selectedComponent?.getEl()
}
