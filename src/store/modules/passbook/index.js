import * as actions from './actions';
import * as getters from './getters';

import mutations from './mutations';

export default {
  namespaced: true,
  actions,
  mutations,
  getters: {
    webItems: (state) => state.items || [],
    webdiff: (state) => state.webdiff || '',
    mobItems: (state) => state.mobItems || [],
    mobdiff: (state) => state.mobdiff || '',
    ...getters,
  },
  state: {
    items: [],
    mobItems: [], //item {tips,hostname,username,password,isblocker:false}
    webdiff: '+2', //+2
    mobdiff: '', //-1
  },
};
