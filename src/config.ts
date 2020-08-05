interface StoreDevtoolsSwitcherConfig {
  disabledKeys?: string[]
}

const getConfig = (): StoreDevtoolsSwitcherConfig => {
  try {
    return JSON.parse(localStorage.getItem('store-devtool-switcher')) ?? {}
  } catch {
    return {}
  }
}

const config = getConfig()

export const setEnabledKey = (key: string, enabled: boolean) => {
  config.disabledKeys = enabled
    ? (config.disabledKeys ?? []).filter(k => k !== key)
    : [key, ...(config.disabledKeys ?? [])]
  localStorage.setItem('store-devtool-switcher', JSON.stringify(config))
}

export const isKeyEnabled = (key: string) => !(config.disabledKeys ?? []).includes(key)
