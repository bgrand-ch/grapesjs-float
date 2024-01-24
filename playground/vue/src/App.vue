<template>
  <main>
    <div id="editor">
      <div style="display: flex; height: 400px;">
        <div data-gjs-type="column" data-gjs-resizable="true" style="flex-grow: 1;">Col 1</div>
        <div data-gjs-type="column" data-gjs-resizable="true" style="flex-grow: 2;">Col 2</div>
        <div data-gjs-type="column" data-gjs-resizable="true" style="flex-grow: 1;">Col 3</div>
      </div>

      <div data-gjs-type="text">
        Insert your text here
      </div>

      <div data-gjs-type="text">
        Insert your text here
      </div>

      <div data-gjs-type="text">
        Insert your text here
      </div>
    </div>

    <div
      v-show="floatingInfo"
      ref="floatingEl"
      class="floating-element"
    >
      {{ floatingInfo }}
    </div>
  </main>
</template>

<script setup lang="ts">
import 'grapesjs/dist/css/grapes.min.css'

import { ref, shallowRef, onMounted } from 'vue'
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsBlocks from 'grapesjs-blocks-basic'
import grapesjsFloat from 'grapesjs-float'

import { showFloatingCommand, hideFloatingCommand } from './utils/command'
import { capitalizeValue } from './utils/string'

import type { Editor, Component } from 'grapesjs'
import type { CommandOptions } from 'grapesjs-float'

const editor = shallowRef<Editor|null>(null)
const floatingEl = shallowRef<HTMLElement|null>(null)
const floatingInfo = ref<string>('')

onMounted(async () => {
  editor.value = grapesjs.init({
    container: '#editor',
    height: '100vh',
    fromElement: true,
    storageManager: false,
    plugins: [
      usePlugin(grapesjsBlocks, {
        flexGrid: true
      }),
      usePlugin(grapesjsFloat)
    ]
  })

  editor.value.once('load', () => {
    console.log('Editor loaded', editor.value)
  })

  // Show the floating element around the selected component.
  editor.value.on('component:selected', (selectedComponent: Component) => {
    const { type: componentType, name: componentName = '' } = selectedComponent.props()
    const selectedEl = selectedComponent.getEl()

    if (
      !selectedEl ||
      !floatingEl.value
    ) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: selectedEl,
      floatingElement: floatingEl.value
    }

    editor.value!.runCommand(showFloatingCommand, commandOptions)

    const label = capitalizeValue(componentType) || componentName

    floatingInfo.value = `${label} (styles, settings, ...)`
  })

  // Hide the floating element.
  editor.value.on('component:deselected', (deselectedComponent: Component) => {
    const deselectedEl = deselectedComponent.getEl()

    if (
      !deselectedEl ||
      !floatingEl.value
    ) {
      return
    }

    const commandOptions: CommandOptions = {
      referenceElement: deselectedEl,
      floatingElement: floatingEl.value
    }

    editor.value!.runCommand(hideFloatingCommand, commandOptions)

    floatingInfo.value = ''
  })

  // On floating element shown
  editor.value.on(showFloatingCommand, (floatingElement, referenceElement) => {
    console.log('Floating element is shown', {
      floatingElement,
      referenceElement
    })
  })

  // On floating element hidden
  editor.value.on(hideFloatingCommand, (floatingElement, referenceElement) => {
    console.log('Floating element is hidden', {
      floatingElement,
      referenceElement
    })
  })
})
</script>

<style scoped>
.floating-element {
  min-width: 250px;
  min-height: 300px;
  padding: 8px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

body {
  line-height: 1;
}
</style>
