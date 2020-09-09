import * as types from './mutation-types'

export default {
  [types.UPDATE_AUTOLOCKED_MINS](state,mins) {
    state.autoLockedMins = mins
  }
}
