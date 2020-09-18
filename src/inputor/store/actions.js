import * as types from './mutation-types';

export const updateState = async ({ commit }, payload = {}) => {
  const { isUnlocked, items } = payload;
  commit(types.UPDATE_ISUNLOCK, isUnlocked);
  if (items) commit(types.UPDATE_ITEMS, items);
};
