import * as types from './mutation-types';

export default {
  [types.UPDATE_WEBSITE_ITEMS](state, items) {
    state.items = items;
  },
  [types.UPDATE_WEBSITE_ITEMS](state, diff) {
    state.webdiff = diff || '';
  },
  [types.UPDATE_MOBILE_ITEMS](state, items) {
    state.mobItems = items;
  },
  [types.UPDATE_MOBDIFF](state, diff) {
    state.mobdiff;
  },
};
