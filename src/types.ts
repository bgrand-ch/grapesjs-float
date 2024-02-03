export type CommandOptions = {
  referenceElement?: HTMLElement,
  floatingElement?: HTMLElement,
  isDebugging?: boolean
}

export type PluginOptions = {
  floatingElement?: HTMLElement
}

export type Store = {
  floatingElement?: HTMLElement,
  stopAutoUpdate?: () => void
}
