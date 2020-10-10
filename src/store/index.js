import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';
import { DEFAULT_LOCALE } from '../corejs/settings';

// modules
import acc from './modules/acc';
import p3 from './modules/p3';
import app from './modules/app';
import settings from './modules/settings';
import passbook from './modules/passbook';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    acc,
    p3,
    app,
    settings,
    passbook,
  },
  state: {
    locale: DEFAULT_LOCALE,
    key: null, //pwd key
    v3: null, //v3 encrypt data
    env3: null,
    bipinit: null,
    isUnlocked: false,
    dense: true,
    lockTime: 15 * 60, //s
    loginError: '',
    loginLoading: false,
    rdrawer: false,
    chainId: 3,
    wallet: '',
    privateKey: null,
    publicKey: null,
    selectedAddress: '',
    nickname: '',
    liveError: '', //common connect error
    liveLoadig: false, //post a live-long message will not back
    networks: [
      {
        text: 'Ropsten',
        value: 3,
        color: 'rgba(233, 21, 80, 0.7)',
      },
      {
        text: 'Mainnet',
        value: 1,
        color: 'rgba(3, 135, 137, 0.7)',
      },
    ],
    gasParams: {
      standard: 20.0,
      exact: false,
      safeLow: 0,
      fast: 0,
      fastest: 0,
    },
    gasParamsLoading: false,
  },
  getters: {
    gasParamsLoading: (state) => state.gasParamsLoading,
    locale: (state) => state.locale,
    dense: (state) => state.dense,
    chainId: (state) => state.chainId,
    wallet: (state) => state.wallet,
    bipinit: (state) => state.bipinit,
    isUnlocked: (state) => state.isUnlocked,
    v3: (state) => state.v3,
    env3: (state) => state.env3,
    loginError: (state) => state.loginError || '',
    loginLoading: (state) => state.loginLoading || false,
    selectedAddress: (state) => state.selectedAddress,
    ...getters,
  },
  mutations,
  actions,
});
