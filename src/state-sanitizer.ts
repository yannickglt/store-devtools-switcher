import { isKeyEnabled, setEnabledKey } from './config'

let previousDisplayedState = {}

const displayState = state => {
  const extendedState = Object.keys(state).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: {
        enabled: isKeyEnabled(curr),
        get ['Click on "(…)" to toggle']() {
          this.enabled = !this.enabled
          setEnabledKey(curr, this.enabled)
          console.table(extendedState)
          return 'Updated to ' + this.enabled
        }
      }
    }),
    {}
  )
  const identical = Object.keys(extendedState).reduce(
    (prev, curr) => prev && extendedState[curr].enabled === previousDisplayedState[curr]?.enabled,
    true
  )
  if (!identical) {
    console.table(extendedState)
    previousDisplayedState = extendedState
  }
}

const removeDisabledKeys = state =>
  Object.keys(state)
    .filter(isKeyEnabled)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: state[curr]
      }),
      {}
    )

const isCustomSanitizer = <State extends {}>(
  stateOrCustomSanitizer: State | ((state: State) => any)
): stateOrCustomSanitizer is (state: State) => any => typeof stateOrCustomSanitizer === 'function'

export const stateSanitizer = (stateOrCustomSanitizer): any => {
  if (isCustomSanitizer(stateOrCustomSanitizer)) {
    return state => {
      displayState(state)
      const filteredState = removeDisabledKeys(state)
      return stateOrCustomSanitizer(filteredState)
    }
  } else {
    displayState(stateOrCustomSanitizer)
    return removeDisabledKeys(stateOrCustomSanitizer)
  }
}
