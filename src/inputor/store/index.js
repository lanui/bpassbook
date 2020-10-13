import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

import { TITLE_DELIMITER } from '@/bglib/item-transfer';

export default new Vuex.Store({
  actions,
  getters: {
    favicon: (state) => state.favIconUrl,
    delimiter: (state) => TITLE_DELIMITER,
    isUnlocked: (state) => state.isUnlocked,
    selectedAddress: (state) => state.selectedAddress,
    items: (state) => {
      const filter = state.filterHost;
      return state.items.filter((it) => it.hostname && it.hostname.endsWith(filter));
    },
  },
  mutations,
  state: {
    isUnlocked: false,
    selectedAddress: '',
    items: [], //{username,password,hostname,...}
    favIconUrl: '',
    tabId: '',
    filterHost: '',
  },
});
