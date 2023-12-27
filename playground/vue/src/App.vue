<template>
  <main>
    <div id="editor">
      <div data-gjs-type="text" style="max-width: 600px;">
        Insert your text here
      </div>
    </div>

    <v-card
      v-show="showFloatingComponent"
      ref="floatingComponent"
      class="mx-auto"
      min-width="300"
    >
      <v-card-item>
        <v-card-title>
          Floating element
        </v-card-title>
        <v-card-subtitle>
          Test form reactivity.
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-text-field
          v-model="form.firstName"
          label="First name"
          required
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="form.lastName"
          label="Last name"
          required
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-card>
  </main>
</template>

<script setup lang="ts">
import 'grapesjs/dist/css/grapes.min.css'

import { ref, shallowRef, reactive, watch, onMounted } from 'vue'
import grapesjs, { usePlugin } from 'grapesjs'
import grapesjsBlocks from 'grapesjs-blocks-basic'
import grapesjsFloat from 'grapesjs-float'

import type { ComponentPublicInstance } from 'vue'
import type { Editor } from 'grapesjs'

const editor = ref<Editor|null>(null)
const showFloatingComponent = ref(false)
const floatingComponent = shallowRef<ComponentPublicInstance|null>(null)
const form = reactive({
  firstName: '',
  lastName: ''
})

watch(form, value => {
  console.log('Form updated', value)
})

watch(showFloatingComponent, value => {
  if (
    !editor.value ||
    !floatingComponent.value
  ) {
    return
  }

  const editorCommands = editor.value.Commands
  const floatingElement = floatingComponent.value.$el

  if (!value) {
    editorCommands.run('float:hide-element', {
      isDebugging: true
    })
    return
  }

  editorCommands.run('float:show-element', {
    floatingElement,
    isDebugging: true
  })
})

onMounted(() => {
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

  editor.value.on('load', () => {
    console.log('Editor loaded', editor.value)

    showFloatingComponent.value = true

    const tenSeconds = 10000
    const timeoutId = window.setTimeout(() => {
      showFloatingComponent.value = false
      window.clearTimeout(timeoutId)
    }, tenSeconds)
  })
})
</script>
