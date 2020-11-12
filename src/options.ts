import { StoreDevtoolsSwitcherConfig } from './config'

export interface StateSanitizerOptions<State extends {}> {
  customSanitizer?: (state: State) => any
  defaultConfig?: StoreDevtoolsSwitcherConfig
  sortKeys?: 'none' | 'root' | 'deep'
  maxSortDeepLevel?: number
}

export const DEFAULT_MAX_SORT_DEEP_LEVEL: number = 10
