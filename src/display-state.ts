import {
  disableAllKeys,
  enableAllKeys,
  isKeyEnabled,
  setEnabledKey,
  SwitchActionKeys,
  switchActionsKeysArray
} from './config'

let previousDisplayedState = {}

const displayEnableAllLink = (getExtendedState) => {
  return {
    [SwitchActionKeys.EnableAll]: {
      enabled: '',
      get ['Click on "(…)" to toggle']() {
        enableAllKeys()
        displayState(getExtendedState())
        return 'All keys have been enabled'
      }
    }
  }
}

const displayDisableAllLink = (state, getExtendedState) => {
  return {
    [SwitchActionKeys.DisableAll]: {
      enabled: '',
      get ['Click on "(…)" to toggle']() {
        disableAllKeys(Object.keys(state))
        displayState(getExtendedState())
        return 'All keys have been disabled'
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
          console.table(extendedState)
          return 'Updated to ' + this.enabled
        }
      }
    }),
    {
      ...displayEnableAllLink(() => extendedState),
      ...displayDisableAllLink(state, () => extendedState)
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
