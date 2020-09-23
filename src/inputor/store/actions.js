import * as types from './mutation-types';

export const updateState = async ({ commit }, payload = {}) => {
  const { isUnlocked, items, selectedAddress } = payload;
  commit(types.UPDATE_ISUNLOCK, isUnlocked);
  if (items) commit(types.UPDATE_ITEMS, items);
  commit(types.UPDATE_SELECTED_ADDRESS, selectedAddress);
};

export const updateInitState = async ({ commit }, initState = {}) => {
  const { isUnlocked, GitbookController, AppStateController } = initState;
  commit(types.UPDATE_ISUNLOCK, isUnlocked);
  commit(types.UPDATE_SELECTED_ADDRESS, AppStateController?.selectedAddress || '');
  const items = GitbookController?.passbook;
  if (items) commit(types.UPDATE_ITEMS, items);
};
