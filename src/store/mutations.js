import * as types from './mutation-types';

const DEFAULF_BIPKEY = true;

export default {
  [types.UPDATE_CHAINID](state, chainId) {
    state.chainId = chainId;
  },
  [types.UPDATE_RDRAWER](state, bShow) {
    state.rdrawer = Boolean(bShow);
  },
  [types.SET_BIPINIT](state, key) {
    state.bipinit = key || DEFAULF_BIPKEY;
  },
  [types.CLEAN_BIPINIT](state) {
    state.bipinit = null;
  },
  [types.UPDATE_ISUNLOCKED](state, isUnlocked = false) {
    state.isUnlocked = Boolean(isUnlocked);
  },
  [types.UPDATE_KEY](state, key = null) {
    state.key = key;
  },
  [types.SET_V3](state, v3 = null) {
    state.v3 = v3;
  },
  [types.UPDATE_WALLET](state, address) {
    state.wallet = address || '';
  },
  [types.SET_ENV3](state, env3) {
    state.env3 = env3 || null;
  },
  [types.SET_LOGINLOADING](state, loading) {
    state.loginLoading = Boolean(loading);
  },
  [types.UPDATE_NICKNAME](state, nickname) {
    state.nickname = nickname || '';
  },
  [types.SET_LOGINERROR](state, error) {
    state.loginError = error || '';
  },
  [types.UPDATE_SELECTEDADDRESS](state, address) {
    state.selectAddress = address || '';
  },
  [types.SET_WALLET_OPEN](state, { privateKey = null, publicKey = null, selectedAddress = '', chainId = 3 }) {
    state.privateKey = privateKey;
    state.publicKey = publicKey;
    state.selectedAddress = selectedAddress;
    state.chainId = chainId;
  },
};
