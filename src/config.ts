export interface StoreDevtoolsSwitcherConfig {
  disabledKeys?: string[]
}

const getConfig = (defaultConfig: StoreDevtoolsSwitcherConfig = {}): StoreDevtoolsSwitcherConfig => {
  try {
    return JSON.parse(localStorage.getItem('store-devtool-switcher')) ?? defaultConfig
  } catch {
    return defaultConfig
  }
}

let config: StoreDevtoolsSwitcherConfig

export const initConfig = (defaultConfig?: StoreDevtoolsSwitcherConfig) => {
  config = getConfig(defaultConfig)
}

export const setEnabledKey = (key: string, enabled: boolean) => {
  config.disabledKeys = enabled
    ? (config.disabledKeys ?? []).filter(k => k !== key)
    : [key, ...(config.disabledKeys ?? [])]
  localStorage.setItem('store-devtool-switcher', JSON.stringify(config))
}

export const isKeyEnabled = (key: string) => !(config.disabledKeys ?? []).includes(key)
