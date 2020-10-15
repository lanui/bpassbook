import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters: {
    isUnlocked: (state) => Boolean(state.isUnlocked),
  },
  mutations,
  state: {
    isUnlocked: false,
    favIconUrl: '',
    tabId: '',
    filterHost: '',
    items: [], //{username,password,hostname,...}
  },
});
