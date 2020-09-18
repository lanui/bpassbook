import * as types from './mutation-types';

export default {
  [types.UPDATE_ISUNLOCK](state, isUnlocked) {
    state.isUnlocked = Boolean(isUnlocked);
  },
  [types.UPDATE_ITEMS](state, items) {
    state.items = typeof items === 'object' && items.length ? items : [];
  },
};
