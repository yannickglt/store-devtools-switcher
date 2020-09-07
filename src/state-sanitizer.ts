import { initConfig, isKeyEnabled } from './config'
import { displayState } from './display-state'
import { StateSanitizerOptions } from './options'
import { sortObject } from './sort-object'

const removeDisabledKeys = <State extends {}>(state): Partial<State> =>
  Object.keys(state)
    .filter(isKeyEnabled)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: state[curr]
      }),
      {}
    )

export const stateSanitizer = <State extends {}>(options?: StateSanitizerOptions<Partial<State>>): any => {
  initConfig(options?.defaultConfig)

  return (state: State) => {
    const rootSortedState = options?.sortKeys === 'root' || options?.sortKeys === 'deep' ? sortObject(state) : state
    displayState(rootSortedState)

    const filteredState = removeDisabledKeys(rootSortedState)
    const deepSortedState = options?.sortKeys === 'deep' ? sortObject(filteredState, true) : filteredState // Deep sort only after keys removal for perfs purpose
    return options?.customSanitizer ? options.customSanitizer(deepSortedState) : deepSortedState
  }
}
