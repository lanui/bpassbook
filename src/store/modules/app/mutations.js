import * as types from './mutation-types'

export default {
  [types.UPDATE_LDRAWER](state, ldrawer) {
    state.ldrawer = ldrawer
  },
  [types.UPDATE_DENSE](state, dense) {
    state.dense = dense
  },
  [types.UPDATE_MINI](state,mini){
    state.mini = Boolean(mini)
  },
  [types.UPDATE_CURNAVS](state, curnavs) {
    state.curnavs = curnavs || ['home']
  }
}
