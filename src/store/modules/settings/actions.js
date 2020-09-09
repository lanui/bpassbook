import * as types from './mutation-types'

export default {
  autoLockedMins : async ({ commit }, mins) => {
    commit(types.UPDATE_AUTOLOCKED_MINS, mins)
  },
}
