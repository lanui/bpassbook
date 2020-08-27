import * as types from './mutation-types'

const toggleLDrawer = async ({commit,state},drawer) =>{
  if(drawer !== undefined){
    commit(types.UPDATE_LDRAWER, Boolean(drawer))
  }else {
    commit(types.UPDATE_LDRAWER, !Boolean(state.drawer))
  }
}

const toggleNavMini = async ({commit,state}) =>{
  commit(types.UPDATE_MINI,!Boolean(state.mini))
}

export default {
  toggleLDrawer,
  toggleNavMini
}
