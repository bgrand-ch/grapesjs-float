import type { Editor } from 'grapesjs'

export function getSelectedElement (editor: Editor) {
  const selectedComponent = editor.getSelected()
  const wrapperComponent = editor.getWrapper()

  if (!selectedComponent && wrapperComponent) {
    editor.select(wrapperComponent)
    return wrapperComponent.getEl()
  }

  return selectedComponent?.getEl()
}

export function getFloatingElement (
  floatingElementManager: Map<HTMLElement, HTMLElement>,
  selectedElement?: HTMLElement,
  previousElement?: HTMLElement
) {
  const currFloatingElement = selectedElement ? floatingElementManager.get(selectedElement) : undefined
  const prevFloatingElement = previousElement ? floatingElementManager.get(previousElement) : undefined

  return currFloatingElement || prevFloatingElement
}
