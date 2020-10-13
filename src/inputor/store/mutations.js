import * as types from './mutation-types';

export default {
  [types.UPDATE_ISUNLOCK](state, isUnlocked) {
    state.isUnlocked = Boolean(isUnlocked);
  },
  [types.UPDATE_ITEMS](state, items) {
    state.items = typeof items === 'object' && items.length ? items : [];
  },
  [types.UPDATE_PLAIN](state, plain) {
    state.Plain = plain;
  },
  [types.UPDATE_SELECTED_ADDRESS](state, selectedAddress) {
    state.selectedAddress = selectedAddress;
  },
  [types.UPDATE_FILTER_HOST](state, filterHost) {
    state.filterHost = filterHost ? filterHost.toString().trim().toLowerCase() : '';
  },
  [types.UPDATE_TABID](state, tabId) {
    state.tabId = tabId;
  },
  [types.UPDATE_FAVICON_URL](state, favIconUrl) {
    state.favIconUrl = favIconUrl;
  },
};
