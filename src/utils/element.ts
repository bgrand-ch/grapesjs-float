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
