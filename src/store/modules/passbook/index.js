import * as actions from './actions';
import * as getters from './getters';

import mutations from './mutations';

export default {
  namespaced: true,
  actions,
  mutations,
  getters: {
    webItems: (state) => state.items || [],
    ...getters,
  },
  state: {
    items: [],
    mobItems: [], //item {tips,hostname,username,password,isblocker:false}
    webPlain: null,
    mobPlain: null,
  },
};
