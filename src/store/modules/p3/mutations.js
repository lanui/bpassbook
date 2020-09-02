import { LOAD_ACTIVITY, UPDATE_LOCKED } from './mutation-types'

export default {
  [LOAD_ACTIVITY](state,activities) {
    state.activities = activities ||[]
  },
  [UPDATE_LOCKED](state,locked) {
    state.locked = Boolean(locked)
  }
}
