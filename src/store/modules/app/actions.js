import * as types from './mutation-types'

const toggleLDrawer = async ({ commit, state }, drawer) => {
  if (drawer !== undefined) {
    commit(types.UPDATE_LDRAWER, Boolean(drawer))
  } else {
    commit(types.UPDATE_LDRAWER, !Boolean(state.drawer))
  }
}

const toggleNavMini = async ({ commit, state }) => {
  commit(types.UPDATE_MINI, !Boolean(state.mini))
}

/**
 *
 * @param {*} param0
 * @param {*} breadcrumbs
 */
const setCurrentNav = async ({ commit }, breadcrumbs) => {
  commit(types.UPDATE_CURNAVS, breadcrumbs)
}

export default {
  toggleLDrawer,
  toggleNavMini,
  setCurrentNav,
}
