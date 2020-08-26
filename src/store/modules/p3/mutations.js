import types, { LOAD_ACTIVITY } from './mutation-types'

export default {
  [LOAD_ACTIVITY](state,activities) {
    state.activities = activities ||[]
  }
}
