import type { Store } from '../types'

const store: Store = {}

export function getStoreValue (): Store {
  return store
}

export function addStoreValue (value: Store): void {
  for (const key in value) {
    const storeKey = key as keyof Store
    const storeValue = value[storeKey]

    // @ts-expect-error
    store[storeKey] = storeValue
  }
}

export function resetStore (): void {
  if (store.stopAutoUpdate) {
    store.stopAutoUpdate()
  }

  for (const key in store) {
    const storeKey = key as keyof Store
    delete store[storeKey]
  }
}
