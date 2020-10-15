import * as types from './mutation-types';

export default {
  [types.UPDATE_IS_UNLOCKED](state, isUnlocked = false) {
    state.isUnlocked = isUnlocked;
  },
  [types.UPDATE_FAVICONURL](state, favIconUrl = '') {
    state.favIconUrl = favIconUrl;
  },
  [types.UPDATE_TABID](state, tabId) {
    state.tabId = tabId;
  },
  [types.UPDATE_FILTER_HOST](state, filterHost) {
    state.filterHost = filterHost;
  },
  [types.UPDATE_ITEMS](state, items = []) {
    state.items = items;
  },
};
