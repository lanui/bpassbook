import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters: {
    isUnlocked: (state) => state.isUnlocked,
    items: (state) => (state.items ? state.items : []),
  },
  mutations,
  state: {
    isUnlocked: false,
    items: [], //{username,password,hostname,...}
  },
});
