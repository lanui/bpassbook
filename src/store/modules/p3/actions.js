import * as types from './mutation-types';

const actions = {
  async syncActivity({ commit, rootState }, { wallet }) {},
  async lockedAccount({ commit }) {
    commit(types.UPDATE_LOCKED, true);
  },
  async unlockedAccount({ commit }, { locked = false }) {
    commit(types.UPDATE_LOCKED, locked);
  },
  async toggleRightDrawer({ commit }, drawer) {
    commit(types.UPDATE_DRAWER, drawer);
  },
  async setCreatingState({ commit }, { creating = false, error = '' }) {
    commit(types.UPDATE_CREATING_STATE, creating);
    commit(types.UPDATE_CREAT_ERROR, error);
  },
  async updateTransferPassbook({ commit }, item) {
    commit(types.UPDATE_UPDATE_PASSBOOK, item);
  },
};

export default actions;
