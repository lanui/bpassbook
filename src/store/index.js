import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';
import { DEFAULT_LOCALE } from '../corejs/settings'

// modules
import p3 from './modules/p3'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    p3,
    app,
    settings,
  },
  state: {
    locale: DEFAULT_LOCALE,
    key:null,  //pwd key
    v3:null,//v3 encrypt data
    env3:null,
    bipinit: null,
    unlocked: false,
    dense: true,
    lockTime: 15 * 60,//s
    foo: 'bar',
    rdrawer: false,
    chainId: 3,
    wallet: '',
    nickname: "lanberyEth",
    networks: [
      {
        text: 'Ropsten', value: 3, color: 'rgba(233, 21, 80, 0.7)'
      },
      {
        text: "Mainnet", value: 1, color: 'rgba(3, 135, 137, 0.7)'
      }
    ]
  },
  getters: {
    locale: state => state.locale,
    dense: state => state.dense,
    chainId: state => state.chainId,
    wallet: state => state.wallet,
    bipinit: state => state.bipinit,
    unlocked: state => state.unlocked,
    v3:state => state.v3,
    env3:state => state.env3,
    ...getters
  },
  mutations,
  actions,
});
