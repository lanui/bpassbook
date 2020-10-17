import * as types from './mutation-types';

export default {
  [types.UPDATE_WEBSITE_ITEMS](state, items) {
    state.items = items;
  },
  [types.UPDATE_WEBPLAIN](state, plain) {
    state.webPlain = plain || null;
  },
  [types.UPDATE_MOBILE_ITEMS](state, items) {
    state.mobItems = items;
  },
  [types.UPDATE_MOBPLAIN](state, plain) {
    state.mobPlain = plain || null;
  },
  [types.TOGGLE_PWD_SHOW](state, item) {
    if (item && item.tips && state.items.length > 0) {
      const idx = state.items.findIndex((it) => it.tips === item.tips);

      if (idx >= 0) {
        const oriItem = state.items[idx];
        oriItem.showpwd = !Boolean(oriItem.showpwd);
        state.items.splice(idx, 1, oriItem);
      }
    }
  },
};
