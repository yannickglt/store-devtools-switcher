let store = {}
const localStorageMock = {
  getItem: key => store[key],
  setItem: (key, value) => (store[key] = value),
  clear: () => (store = {}),
  removeItem: key => delete store[key]
}

;(global as any).localStorage = localStorageMock
