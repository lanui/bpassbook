import * as types from './mutation-types';

export const toggleLDrawer = async ({ commit, state }, drawer) => {
  if (drawer !== undefined) {
    commit(types.UPDATE_LDRAWER, Boolean(drawer));
  } else {
    commit(types.UPDATE_LDRAWER, !Boolean(state.drawer));
  }
};

export const toggleNavMini = async ({ commit, state }) => {
  commit(types.UPDATE_MINI, !Boolean(state.mini));
};

/**
 *
 * @param {*} param0
 * @param {*} breadcrumbs
 */
export const setCurrentNav = async ({ commit }, breadcrumbs) => {
  commit(types.UPDATE_CURNAVS, breadcrumbs);
};

/**
 * live connect request or response used
 * @param {string} error
 * @param {boolean} loading
 */
export const setRemoteResponseState = async ({ commit }, { error = '', loading = false }) => {
  commit(types.SET_REMOTE_SAVING, loading);
  commit(types.SET_REMOTE_ERROR, error);
};

export const setCreateStepid = async ({ commit }, stepid = 1) => {
  commit(types.SET_STEPID, stepid);
};
