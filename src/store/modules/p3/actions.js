import types from './mutation-types'


const actions = {
  async syncActivity({commit,rootState},{wallet}) {

  },
  async lockedAccount({commit}){
    commit(types.UPDATE_LOCKED,true)
  },
  async unlockedAccount({commit},{locked = false}) {
    commit(types.UPDATE_LOCKED, locked)

  },
  async toggleRightDrawer({commit},drawer){
    commit(types.UPDATE_DRAWER,drawer)
  }
}

export default actions
