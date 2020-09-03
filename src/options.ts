import { StoreDevtoolsSwitcherConfig } from './config'

export interface StateSanitizerOptions<State extends {}> {
  customSanitizer?: (state: State) => any
  defaultConfig?: StoreDevtoolsSwitcherConfig
  sortKeys?: 'none' | 'root' | 'deep'
}
