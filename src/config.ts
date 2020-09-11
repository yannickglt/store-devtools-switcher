export enum SwitchActionKeys {
  EnableAll = 'Enable all keys',
  DisableAll = 'Disable all keys'
}

export const switchActionsKeysArray = Object.values(SwitchActionKeys) as string[]

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

const saveConfig = () => {
  localStorage.setItem('store-devtool-switcher', JSON.stringify(config))
}

export const initConfig = (defaultConfig?: StoreDevtoolsSwitcherConfig) => {
  config = getConfig(defaultConfig)
}

export const setEnabledKey = (key: string, enabled: boolean) => {
  config.disabledKeys = enabled
    ? (config?.disabledKeys ?? []).filter(k => k !== key)
    : [key, ...(config?.disabledKeys ?? [])]
  saveConfig()
}

export const isKeyEnabled = (key: string) => !(config?.disabledKeys ?? []).includes(key)

export const hasKeyDisabled = () => {
  return (config?.disabledKeys?.length ?? 0) > 0
}

export const enableAllKeys = () => {
  config.disabledKeys = []
  saveConfig()
}

export const disableAllKeys = (keys: string[]) => {
  config.disabledKeys = keys
  saveConfig()
}
