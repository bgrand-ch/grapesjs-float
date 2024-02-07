import { autoUpdate, computePosition, offset, autoPlacement, shift } from '@floating-ui/dom'
import { logScope } from './constant'
import { hasAvailableElement } from './element'
import { resetStore } from './store'

import type { ComputePositionConfig } from '@floating-ui/dom'

export function updateFloatingPosition (referenceElement: HTMLElement, floatingElement: HTMLElement) {
  const positionConfig: ComputePositionConfig = {
    placement: 'right',
    middleware: [
      offset(10),
      autoPlacement(),
      shift({
        crossAxis: true,
        padding: 10
      })
    ]
  }

  return () => {
    if (
      !floatingElement ||
      !hasAvailableElement(floatingElement)
    ) {
      resetStore()
      return
    }

    computePosition(referenceElement, floatingElement, positionConfig).then(({ x, y }) => {
      floatingElement.style.left = `${x}px`
      floatingElement.style.top = `${y}px`
    }).catch(err => {
      const { message } = err as Error
      console.warn(`${logScope} updateFloatingPosition - ${message}`)
    })
  }
}

export function showFloatingElement (referenceElement: HTMLElement, floatingElement: HTMLElement) {
  try {
    const floatingStyle = window.getComputedStyle(floatingElement)

    if (floatingStyle.display === 'none') {
      floatingElement.style.display = 'block'
    }

    if (floatingStyle.position !== 'absolute') {
      floatingElement.style.position = 'absolute'
    }

    if (['0', 'auto'].includes(floatingStyle.zIndex)) {
      floatingElement.style.zIndex = '99999'
    }

    if (floatingStyle.width === 'auto') {
      floatingElement.style.width = 'max-content'
    }

    if (floatingStyle.top !== '0') {
      floatingElement.style.top = '0'
    }

    if (floatingStyle.left !== '0') {
      floatingElement.style.left = '0'
    }

    const updatePosition = updateFloatingPosition(referenceElement, floatingElement)

    return autoUpdate(
      referenceElement,
      floatingElement,
      updatePosition
    )
  } catch (err) {
    const { message } = err as Error
    console.warn(`${logScope} showFloatingElement - ${message}`)
  }
}

export function hideFloatingElement (floatingElement: HTMLElement, stopAutoUpdate?: () => void) {
  try {
    const floatingStyle = window.getComputedStyle(floatingElement)

    if (floatingStyle.display !== 'none') {
      floatingElement.style.display = 'none'
    }

    if (stopAutoUpdate) {
      stopAutoUpdate()
    }
  } catch (err) {
    const { message } = err as Error
    console.warn(`${logScope} hideFloatingElement - ${message}`)
  }
}
