import { fromV3 } from 'ethereumjs-wallet';

import * as types from './mutation-types';

import LocalStore from '@/lib/storage/local-store';

const passworder = require('browser-passworder');

/**
 * login response Error
 * @param {*} param0
 * @param {*} errMsg
 */
export const setLoginError = ({ commit }, errMsg = '') => {
  commit(types.SET_LOGINERROR, errMsg);
  commit(types.SET_LOGINLOADING, false);
};

/**
 * common connect response error
 * @param {*} param0
 * @param {*} param1
 */
export const setLiveError = ({ commit }, { errMsg = '', loading = false }) => {
  commit(types.SET_LIVE_ERROR, errMsg);
  commit(types.SET_LIVE_LOADING, loading);
};

export const setLoginLoading = ({ commit }, loading) => {
  commit(types.SET_LOGINLOADING, Boolean(loading));
};

export const setChainId = ({ commit }, chainId) => {
  commit(types.UPDATE_CHAINID, chainId);
};

export const toggleRightDrawer = ({ commit, state }) => {
  const rdrawer = state.rdrawer;
  commit(types.UPDATE_RDRAWER, !rdrawer);
};

export const changeRightDrawer = ({ commit }, flag) => {
  commit(types.UPDATE_RDRAWER, flag);
};

export const unlockWallet = ({ commit }, password) => {
  commit(types.UPDATE_ISUNLOCKED, Boolean(password));
};

export const loadLocalVault = async ({ commit, state }, password) => {
  console.log('loadLocalVault>>>>>');
  const key = state.key;
  const local = new LocalStore();
  const localStore = await local.get();

  if (localStore && localStore.data && localStore.data.env3) {
    const v3 = await passworder.decrypt(password, localStore.data.env3);
    commit(types.SET_BIPINIT, true);
    commit(types.SET_V3, v3);
  }
};

export const loadBipinit = async ({ commit }, payload) => {
  commit(types.SET_BIPINIT, payload);
};

/**
 * set vuex state from backend message
 * @param {*} param0
 * @param {*} payload
 */
export const updateFromBackground = async ({ commit }, payload) => {
  console.log('action>>', payload);

  commit(types.SET_BIPINIT, true);
  commit(types.SET_ENV3, payload.env3 || null);
  if (payload.AppStateController) {
    const { chainId, privateKey, publicKey, selectedAddress } = payload.AppStateController;
    commit(types.SET_WALLET_OPEN, { chainId, privateKey, publicKey, selectedAddress });
  }

  if (payload.isUnlocked) {
    commit(types.SET_BIPINIT, true);
    commit(types.UPDATE_ISUNLOCKED, payload.isUnlocked);
  }
};

export const decryptFromEnv3 = async ({ state }, password) => {
  const { env3 } = state;
  console.log('decryptFromEnv3', env3, password);
  if (!env3) throw new Error('no found env3');
  try {
    const evn3Json = JSON.stringify(env3);

    const v3 = await passworder.decrypt(password, evn3Json);

    const wallet = await fromV3(v3, password);
    const priKey = wallet.getPrivateKeyString();
    // const pubKey = wallet.getPublicKeyString()

    return {
      json: JSON.stringify(v3),
      privateKey: priKey,
    };
  } catch (err) {
    throw err;
  }
};

export const updateInitState = async ({ commit, dispatch }, initState) => {
  const { isUnlocked, GitbookController, AppStateController, env3, v3 } = initState;

  commit(types.UPDATE_ISUNLOCKED, isUnlocked);
  if (isUnlocked) {
    commit(types.SET_BIPINIT, true);
    commit(types.SET_V3, v3);
    commit(types.SET_ENV3, env3);
  }

  if (AppStateController) {
    const { selectedAddress, chainId, privateKey, publicKey, nickname } = AppStateController;
    commit(types.SET_WALLET_OPEN, { chainId, privateKey, publicKey, selectedAddress });
    commit(types.UPDATE_NICKNAME, nickname);
  }
  if (GitbookController) {
    const passbook = GitbookController.passbook;
    await dispatch('passbook/updateItems', passbook);
  }
};
