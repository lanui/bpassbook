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
};
