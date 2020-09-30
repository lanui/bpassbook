import * as types from './mutation-types';

export const syncActivity = async ({ commit, rootState }, { wallet }) => {};
export const lockedAccount = async ({ commit }) => {
  commit(types.UPDATE_LOCKED, true);
};
export const unlockedAccount = async ({ commit }, { locked = false }) => {
  commit(types.UPDATE_LOCKED, locked);
};
export const toggleRightDrawer = async ({ commit }, drawer) => {
  commit(types.UPDATE_DRAWER, drawer);
};
export const setCreatingState = async ({ commit }, { creating = false, error = '' }) => {
  commit(types.UPDATE_CREATING_STATE, creating);
  commit(types.UPDATE_CREAT_ERROR, error);
};
export const updateTransferPassbook = async ({ commit }, item) => {
  commit(types.UPDATE_UPDATE_PASSBOOK, item);
};
