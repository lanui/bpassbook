import types from './mutation-types'

export default {
  [types.LOAD_ACTIVITY](state,activities) {
    state.activities = activities ||[]
  },
  [types.UPDATE_DRAWER](state, drawer) {
    state.drawer = Boolean(drawer)
  },
  [types.UPDATE_LOCKED](state,locked) {
    state.locked = Boolean(locked)
  }
}
