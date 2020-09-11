import {
  disableAllKeys,
  enableAllKeys,
  hasKeyDisabled,
  isKeyEnabled,
  setEnabledKey,
  SwitchActionKeys,
  switchActionsKeysArray
} from './config'

let previousDisplayedState = {}

const displayToggleAllLink = (state, getExtendedState) => {
  const hasKey = hasKeyDisabled()
  return {
    [hasKey? SwitchActionKeys.EnableAll : SwitchActionKeys.DisableAll]: {
      enabled: !hasKey,
      get ['Click on "(…)" to toggle']() {
        hasKey ? enableAllKeys() : disableAllKeys(Object.keys(state))
        displayState(getExtendedState())
        return `All keys have been ${hasKey? 'enabled' : 'disabled'}`
      }
    }
  }
}

export const displayState = state => {
  const extendedState = Object.keys(state)
    .filter((item) => !switchActionsKeysArray.includes(item))
    .reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: {
        enabled: isKeyEnabled(curr),
        get ['Click on "(…)" to toggle']() {
          this.enabled = !this.enabled
          setEnabledKey(curr, this.enabled)
          const {
            [SwitchActionKeys.DisableAll]: disableAction,
            [SwitchActionKeys.EnableAll]: enable,
            ...cleanExtendedState
          } = extendedState
          console.table({
            ...displayToggleAllLink(state, () => cleanExtendedState),
            ...cleanExtendedState
          })
          return 'Updated to ' + this.enabled
        }
      }
    }),
    {
      ...displayToggleAllLink(state, () => extendedState)
    }
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
