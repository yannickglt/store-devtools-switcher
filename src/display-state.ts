import { isKeyEnabled, setEnabledKey } from './config'

let previousDisplayedState = {}

export const displayState = state => {
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
